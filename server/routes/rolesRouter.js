const Router =require('express')
const rolesController = require('../controllers/rolesController')
const router = new Router()

router.get('/roles/:permissionName', rolesController.getOne)

module.exports=router