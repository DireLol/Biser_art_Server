const Router =require('express')
const productController = require('../controllers/productController')
const router = new Router()

router.post('/create', productController.create)
router.get('/getAll', productController.getAll)
router.get('/getOne/:productInfoId',productController.getOne)
router.get('/newAndSpecial',productController.getNewAndSpecialProducts)
router.patch('/patch/:productInfoId', productController.patch)
router.delete('/delete/:productInfoId',productController.delete)

module.exports=router