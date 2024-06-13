const ApiError = require('../error/ApiError');

module.exports=function(err,req,res,next){

    //Если класс ошибки ApiError, тогда на клиент возвратим ответ
    if (err instanceof ApiError){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(503).json({message: "Непредвиденная ошибка!"})
}