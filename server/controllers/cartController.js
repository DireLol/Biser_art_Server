const {Cart,Product,CartProduct} = require('../models/models')

class CartController {
    async addToCart(req, res) {
        const { userId, productId, quantity} = req.body;

        const cart = await Cart.findOne({ where: { userUserId: userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartProduct = await CartProduct.findOne({ where: { cartCartId: cart.cartId, productProductId: productId } });
        if (cartProduct) {
            cartProduct.quantity += quantity;
            // cartProduct.size = size;
            await cartProduct.save();
        } else {
            await CartProduct.create({ cartCartId: cart.cartId, productProductId: productId, quantity});
        }

        res.json({ message: 'Product added to cart' });
    }

    async updateCart(req, res) {
        const { cartProductId, quantity} = req.body;
        const cartProduct = await CartProduct.findByPk(cartProductId);
        if (!cartProduct) {
            return res.status(404).json({ message: 'CartProduct not found' });
        }
        cartProduct.quantity = quantity;
        // cartProduct.size = size;
        await cartProduct.save();
        res.json({ message: 'Cart updated' });
    }

    async removeFromCart(req, res) {
        const { cartProductId } = req.body;
        const cartProduct = await CartProduct.findByPk(cartProductId);
        if (!cartProduct) {
            return res.status(404).json({ message: 'CartProduct not found' });
        }
        await cartProduct.destroy();
        res.json({ message: 'Product removed from cart' });
    }

    async getCart(req, res) {
        const { userId } = req.params;
        const cart = await Cart.findOne({ where: { userUserId: userId }, include: [{ model: Product, through: CartProduct }] });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    }

    async applyPromoCode(req, res) {// Функция на стадии разработки
        const { userId, promoCode } = req.body;
        // Logic for applying promo code and calculating discount
        res.json({ message: 'Promo code applied', discount: 100 });
    }

    async checkout(req, res) {
        const { userId } = req.body;
        const cart = await Cart.findOne({ where: { userUserId: userId }, include: [{ model: Product, through: CartProduct }] });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // Logic for processing the order and clearing the cart
        res.json({ message: 'Checkout successful' });
    }
}
module.exports=new CartController()