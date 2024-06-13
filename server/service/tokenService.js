const jwt = require('jsonwebtoken')
const Model = require('../models/models')


//Чтобы контролллер не был слишком толстым мы создаем сервисы отдельно
class TokenService{
    generateTokens(payLoad){
        try {
            const accessToken = jwt.sign(payLoad, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'});
            const refreshToken = jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
            return { accessToken, refreshToken };
        } catch (error) {
            console.error("Error generating tokens:", error);
            throw new Error('Ошибка при генерации токенов');
        }
    }
    
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            console.error("Invalid refresh token:", error);
            return null;
        }
    }
    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
    async saveToken(userId,refreshToken,deviceInfo){
        try {
            let tokenData = await Model.Token.findOne({ where: { userUserId: userId, deviceInfo } });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            } else {
                tokenData = await Model.Token.create({ refreshToken, deviceInfo, userUserId: userId });
                return tokenData;
            }
        } catch (error) {
            console.error("Ошибка при сохранении токена:", error);
            throw error; 
        }
        
    }
    async removeToken(refreshToken) {
        try {
            const tokenData = await Model.Token.destroy({ where: { refreshToken: refreshToken } });
            return tokenData;
        } catch (error) {
            console.log(error)
            throw new Error('Ошибка при удалении токена');
        }
    }
    async findToken(refreshToken) {
        try {
            console.log("Finding token with refreshToken:", refreshToken);

            const tokenData = await Model.Token.findOne({ where: { refreshToken } });
            
            if (!tokenData) {
                console.log("Token not found");
            }

            return tokenData;
        } catch (error) {
            console.error("Error finding token:", error);
            throw new Error('Ошибка при поиске токена');
        }
    }
    
}
module.exports = new TokenService();