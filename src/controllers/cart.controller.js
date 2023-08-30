import cartService from "../repositories/cart.repository.js";
import productService from "../repositories/product.repository.js";

class CartController {
    constructor() {
        this.controller = cartService;
    }

    async getCarts() {
        try {
            return await this.controller.getCarts();
        }
        catch (err) {
            throw new Error("No se pudo obtener los carritos");
        }
    }

    async addCart() {
        try {
            return await this.controller.addCart();
        }
        catch (err) {
            throw new Error("No se pudo agregar el carrito");
        }
    }

    async addProductToCart(cartId, productCode) {
        try {
            const cart = await this.controller.getSinleCart(cartId);
            const prod = await productService.getProductByCode(productCode);
            const find = cart.products.findIndex(e => e.product.code == productCode);
            if (find > 0) {
                cart.products[find].quantity++;
                console.log(cart.products[find].quantity)
            } else {
                cart.products.push({ product: prod._id });
            }
            return await cart.save();
        }
        catch (err) {
            throw new Error("No se pudo agregar el producto");
        }
    }

    async getSinleCart(cartId) {
        try {
            return await this.controller.getSinleCart(cartId);
        }
        catch (err) {
            throw new Error("No se pudo obtener los carritos");
        }
    }

    async deleteCart(cartId) {
        try {
            return await this.controller.deleteCart(cartId);
        }
        catch (err) {
            throw new Error("No se pudo eliminar el producto");
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
            throw new Error("No se pudo eliminar el producto");
        }
    }

    async updateCart(cartId, products) {
        try {
            return await this.controller.updateCart(cartId, products);
        } catch (err) {
            throw new Error('Error al actualizar los productos en el carrito');
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
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (err) {
            throw new Error('No se pudo actualizar la cantidad del producto');
        }
    }
}

const cartController = new CartController();
export default cartController;