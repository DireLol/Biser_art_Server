const jewelryStyleController = require('../controllers/jewelryStyleController')
const Router =require('express')
const router = new Router()

router.post('/',jewelryStyleController.create)
router.get('/')
router.get('/:id',)
router.patch('/:id',)
router.delete('/:id',)


module.exports=router