const jewelryColorController = require('../controllers/jewelryColorController')
const Router =require('express')
const router = new Router()

router.post('/',jewelryColorController.create)
router.get('/')
router.get('/:id',)
router.patch('/:id',)
router.delete('/:id',)


module.exports=router