const ApiError = require('../error/ApiError')
const tokenService =require('../service/tokenService')
module.exports=function(permission){
    return function (req,res,next){
        if (req.method === "OPTIONS"){
            next()
        }
        try {
            const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader){
                return next(ApiError.UnauthorizedError('Пользователь не авторизован'))
            }
            const accessToken = authorizationHeader.split(' ')[1];//разбиваем на 2 слова: bearer - первый элемент массива, токен - второй
            if (!accessToken){
                return next(ApiError.UnauthorizedError('Пользователь не авторизован'))
            }
            const userData = tokenService.validateAccessToken(accessToken)
            if(!userData){
                return next(ApiError.UnauthorizedError('Пользователь не авторизован'))
            }
            if (userData.permission !== permission){
                return next(ApiError.forbidden('Нет доступа'))
            }
            req.user=userData
            next()
        } catch (error) {
            return next(ApiError.UnauthorizedError('Пользователь не авторизован'))        
        }
} 
}
