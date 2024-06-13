const beadTypeController = require('../controllers/beadTypeController')
const Router =require('express')
const router = new Router()

router.post('/', beadTypeController.create)
router.get('/', beadTypeController.getAll)
router.patch('/:id', beadTypeController.patch)
router.get('/:id', beadTypeController.getOne)
router.delete('/:id', beadTypeController.delete)


module.exports=router