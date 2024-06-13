class ApiError extends Error{
    constructor(status,message, errors =[]){
        super(message);
        this.status=status
        this.errors=errors
    }
    static UnauthorizedError(message){ //пользователь не авторизован
        return new ApiError(401, message)
    }
    static badRequest(message){//страница не найдена
        return new ApiError(404,message)
    }
    static internal(message){//Ошибка на стороне сервера
        return new ApiError(500,message)
    }
    static forbidden(message){//Доступа нет
        return new ApiError(403,message)
    }
}
module.exports=ApiError