const Router =require('express')
const router = new Router()
const typeController = require('../controllers/productTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/',checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.get('/:productTypeId',typeController.getOne)
router.patch('/:id',)
router.delete('/:id',)


module.exports=router