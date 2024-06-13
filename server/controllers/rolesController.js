const {Permission} = require('../models/models')
const ApiError =require ('../error/ApiError')

class PermissionController{
    async getOne (req,res){
        try {
            const role = await Permission.findOne({
              where: {
                permissionName: req.params.permissionName,
              },
            });
            if (role) {
              res.status(200).json(role);
            } else {
              ApiError.badRequest('Роль не найдена' );
            }
          } catch (error) {
            console.error(error);
            ApiError.internal.status('Ошибка сервера');
          }
    }
}
module.exports = new PermissionController()