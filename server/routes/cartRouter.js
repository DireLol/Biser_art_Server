const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware');
const Router =require('express')
const router = new Router()

router.post('/add', authMiddleware, cartController.addToCart);
router.put('/update', authMiddleware,cartController.updateCart);
router.delete('/remove', authMiddleware, cartController.removeFromCart);
router.get('/:userId', authMiddleware, cartController.getCart);

//Функции на стадии разработки
router.post('/apply-promo', authMiddleware, cartController.applyPromoCode); 
router.post('/checkout', authMiddleware, cartController.checkout); 


module.exports=router