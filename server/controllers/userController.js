const ApiError =require('../error/ApiError');
const userService = require('../service/userService');
const {validationResult}=require('express-validator');
const passport = require('passport');


class UserController {
    setRefreshToken = (res, refreshToken) => {
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'Strict' });
    }

    signUp = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
            }
            const { username, email, password } = req.body;
            const deviceInfo = req.headers['deviceinfo'];
            if (!deviceInfo) {
                return res.status(400).json({ message: 'Отсутствует заголовок deviceInfo' });
            }
            const userData = await userService.registration(username, email, password, deviceInfo);
            this.setRefreshToken(res, userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    signIn = async (req, res, next) => {
        try {
            const { usernameOrEmail, password } = req.body;
            const deviceInfo = req.headers['deviceinfo'];
            if (!deviceInfo) {
                return res.status(400).json({ message: 'Отсутствует заголовок deviceInfo' });
            }
            const userData = await userService.login(usernameOrEmail, password, deviceInfo);
            this.setRefreshToken(res, userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    logout = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Выход из системы успешен' });
        } catch (e) {
            console.error(e);
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
    }

    activate = async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    refresh = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                console.error("No refresh token provided in cookies");
                return next(ApiError.unauthorizedError());
            }
            const userData = await userService.refresh(refreshToken);
            this.setRefreshToken(res, userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            console.error("Error in refresh controller:", e);
            next(e);
        }
    }

    getUsers = async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

    googleAuthCallback = (req, res, next) => {
        passport.authenticate('google', async (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login'); // Перенаправьте на страницу входа в случае ошибки
            }
            try {
                const deviceInfo = req.headers['deviceinfo'];
                if (!deviceInfo) {
                    return res.status(400).json({ message: 'Отсутствует заголовок deviceInfo' });
                }
                const userData = await userService.googleLogin(user, deviceInfo);
                this.setRefreshToken(res, userData.refreshToken);
                return res.redirect(process.env.CLIENT_URL); // Перенаправьте на нужную страницу
            } catch (e) {
                next(e);
            }
        })(req, res, next);
    }


}

module.exports = new UserController();