import cartService from "../repositories/cart.repository.js";
import productService from "../repositories/product.repository.js";
import CustomErrors from "../utils/customError.js";

class CartController {
    constructor() {
        this.controller = cartService;
    }

    async getCarts() {
        try {
            return await this.controller.getCarts();
        }
        catch (err) {
            CustomErrors.createError('Problemas al obtener carritos', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async addCart(cart) {
        try {
            const newCart = await this.controller.addCart(cart);
            return newCart;
        }
        catch (err) {
            CustomErrors.createError('Problemas al crear un carrito', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.controller.getSinleCart(cartId);
            const prod = await productService.getProductById(productId);
            const find = cart.products.findIndex(e => e.product._id == productId);
            if (find != -1) {
                cart.products[find].quantity++;
            } else {
                cart.products.push({ product: prod._id, quantity: 1 });
            }
            return await this.controller.addProductToCart({ _id: cart._id }, { products: cart.products });
        }
        catch (err) {
            CustomErrors.createError('Problema en agregar producto', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async getSinleCart(cartId) {
        try {
            return await this.controller.getSinleCart(cartId);
        }
        catch (err) {
            CustomErrors.createError('Problemas al conseguir carrito', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async deleteCart(cartId) {
        try {
            return await this.controller.deleteCart(cartId);
        }
        catch (err) {
            CustomErrors.createError('Problema al eliminar el carrito', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.controller.getSinleCart(cartId);
            cart.products = cart.products.filter(
                (product) => product._id.toString() !== productId
            );
            return await cart.save();
        }
        catch (err) {
            CustomErrors.createError('Problema en eliminar producto del carrito', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async updateCart(cartId, products) {
        try {
            return await this.controller.updateCart(cartId, products);
        } catch (err) {
            CustomErrors.createError('Problema en actualizar carrito', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }

    async updateProductCart(cartId, productId, quantity) {
        try {
            const cart = await this.controller.getSinleCart(cartId);
            const productIndex = cart.products.findIndex(
                (product) => product._id.toString() === productId
            );

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                return await cart.save();
            } else {
                CustomErrors.createError('Producto no encontrado', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
            }
        } catch (err) {
            CustomErrors.createError('No se pudo actualizar la cantidad del producto', generateErrorCart({ err }), 'Error cart', ErrorCodes.CART_ERROR);
        }
    }
}

const cartController = new CartController();
export default cartController;