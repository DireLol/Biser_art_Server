const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError('Пользователь не авторизован'));
        }

        const accessToken = authorizationHeader.split(' ')[1]; // разделение по пробелу
        if (!accessToken) {
            return next(ApiError.UnauthorizedError('Пользователь не авторизован'));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError('Пользователь не авторизован'));
        }

        req.user = userData; // добавление данных пользователя в запрос
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError('Пользователь не авторизован'));
    }
};