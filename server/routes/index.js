//файл- связующее звено. Тут объединяются все маршруты
const Router =require('express')
const router = new Router()
const beadType=require('./beadTypeRouter')
const cart= require('./cartRouter')
const jewerlyColor =require('./jewelryColorRouter')
const jewerlyStyle = require('./jewelryStyleRouter')
const order = require('./orderRouter')
const product = require('./productRouter')
const productType=require('./productTypeRouter')
const user = require('./userRouter')

//routes
router.use('/user', user)
router.use('/beadType', beadType)
router.use('/cart',cart)
router.use('/jewerlyColor', jewerlyColor)
router.use('/jewerlyStyle', jewerlyStyle)
router.use('/order',order)
router.use('/product',product)
router.use('/productType',productType)


module.exports=router