//const User = require('../models/user')
const Model = require('../models/models')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const uuid =require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDTO = require('../dtos/UserDto')
const ApiError = require('../error/ApiError')


class UserService {
    async registration(username, email, password, deviceInfo) {
        try {
            const candidate = await Model.User.findOne({ where: { email }});
            if (candidate) {
                throw ApiError.badRequest(`Пользователь с таким почтовым адресом ${email} уже существует`);
            }

            const notUnicUsername = await Model.User.findOne({ where: { username }});
            if (notUnicUsername) {
                throw ApiError.badRequest(`Пользователь с таким именем ${username} уже существует`);
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const activationLink = uuid.v4();

            const user = await Model.User.create({
                username,
                email,
                password: hashPassword,
                activationLink,
                permissionPermissionId: 2
            }, );

            const cart = await Model.Cart.create({ userId: user.userId });

            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

            const userDTOInstance = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTOInstance });

            await tokenService.saveToken(user.userId, tokens.refreshToken, deviceInfo);


            return {
                ...tokens,
                user: userDTOInstance,
                cart
            };
        } catch (error) {
            console.error(error);
            throw ApiError.UnauthorizedError('Ошибка регистрации');
        }
    }

    async activate(activationLink) {
        try {
            const user = await Model.User.findOne({ where: { activationLink }});
            if (!user) {
                throw ApiError.badRequest('Некорректная ссылка активации');
            }
            user.isActivated = true;
            await user.save();
        } catch (error) {
            console.error(error);
            throw ApiError.badRequest('Ошибка активации');
        }
    }

    async login(usernameOrEmail, password, deviceInfo) {
        try {
            const user = await Model.User.findOne({
                where: {
                    [Sequelize.Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
                }
            });

            if (!user) {
                throw ApiError.badRequest('Пользователя с таким email или именем не существует');
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError.badRequest('Неверный пароль');
            }

            const userDTOInstance = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTOInstance });
            await tokenService.saveToken(user.userId, tokens.refreshToken, deviceInfo);

            return {
                ...tokens,
                user: userDTOInstance,
            };
        } catch (error) {
            console.error(error);
            throw ApiError.UnauthorizedError('Ошибка авторизации');
        }
    }

    async logout(refreshToken) {
        try {
            return await tokenService.removeToken(refreshToken);
        } catch (error) {
            console.error(error);
        }
    }

    async refresh(refreshToken) {
        try {
            console.log("Refreshing token:", refreshToken);
            if (!refreshToken) {
                throw ApiError.UnauthorizedError("No refresh token provided");
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            console.log("User data from token:", userData);
            if (!userData) {
                throw ApiError.UnauthorizedError("Invalid refresh token");
            }
    
            const tokenFromDB = await tokenService.findToken(refreshToken);
            console.log("Token from DB:", tokenFromDB);
            if (!tokenFromDB) {
                throw ApiError.UnauthorizedError("Token not found in DB");
            }
    
            const user = await Model.User.findByPk(tokenFromDB.userUserId);
            const userDTOInstance = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTOInstance });
    
            await tokenService.saveToken(user.userId, tokens.refreshToken, tokenFromDB.deviceInfo);
    
            return {
                ...tokens,
                user: userDTOInstance,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllUsers() {
        return await Model.User.findAll();
    }

    async googleLogin(profile, deviceInfo) {
        try {
            const { id, emails, displayName } = profile;
            let user = await Model.User.findOne({ where: { googleId: id }});

            if (!user) {
                user = await Model.User.create({
                    googleId: id,
                    email: emails[0].value,
                    username: displayName,
                    isActivated: true, // Считаем, что пользователь активирован, так как его учетная запись подтверждена через Google
                    permissionPermissionId: 2
                });
                await Model.Cart.create({ userId: user.userId });
            }
            const userDTOInstance = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTOInstance });

            await tokenService.saveToken(user.userId, tokens.refreshToken, deviceInfo);


            return {
                ...tokens,
                user: userDTOInstance
            };
        } catch (error) {
            console.error(error);
            throw ApiError.UnauthorizedError('Ошибка аутентификации через Google');
        }
    }
}

module.exports = new UserService();