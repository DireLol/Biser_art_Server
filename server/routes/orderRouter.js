const orderController = require('../controllers/orderControl')
const Router =require('express')
const router = new Router()

router.post('/', orderController.create)
router.get('/', orderController.getAll)
router.get('/:id',)
router.patch('/:id',)
router.delete('/:id',)


module.exports=router