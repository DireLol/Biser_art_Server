const {CartProduct} = require('../models/models')
const {Product} = require('../models/models')
class OrderController{

    async addProductToCart(req,res){
        try {
            const { cartCartId, productProductId, quantity } = req.body;
            const cartProduct = await CartProduct.create({ cartCartId, productProductId, quantity });
            return res.status(201).json(cartProduct);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to add product to cart' });
        }
    }
    async getAll (req,res){
        try {
            const { cartCartId } = req.params;
            const cartProducts = await CartProduct.findAll({
                where: { cartCartId },
                include: [{ model: Product, attributes: ['productId', 'name', 'price'] }]
            });
            return res.status(200).json(cartProducts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to get cart products' });
        }
    }
    async removeProductFromCart (req,res){
        try {
            const { cartProductId } = req.params;
            const cartProduct = await CartProduct.findByPk(cartProductId);
            if (!cartProduct) {
                return res.status(404).json({ error: 'Cart product not found' });
            }
            await cartProduct.destroy();
            return res.status(200).json({ message: 'Cart product deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to remove product from cart' });
        }
    }


}
module.exports=new OrderController()