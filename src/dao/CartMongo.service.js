import cartModel from "../models/cart.model.js";
import { productService } from "../utils/instances.js";

export default class CartMongoService {

    constructor() {
        this.model = cartModel;
    }

    async addCart(cart) {
        try {
            return await this.model.create(cart);
        }
        catch (err) {
            throw new Error("No se pudo agregar el carrito");
        }
    }

    async addProductToCart(cartId, productCode) {
        try {
            const cart = await this.model.findOne({ _id: cartId });
            const prod = await productService.getProductByCode(productCode);
            const find = cart.products.findIndex(e => e.product.code == productCode)
            console.log(find)
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

    async getCarts() {
        try {
            return await this.model.find();
        }
        catch (err) {
            throw new Error("No se pudo obtener los carritos");
        }
    }

    async getSinleCart(cartId) {
        try {
            return await this.model.findOne({ _id: cartId }).lean();
        }
        catch (err) {
            throw new Error("No se pudo obtener los carritos");
        }
    }

    async deleteCart(cartId) {
        try {
            return await this.model.findByIdAndDelete({ _id: cartId });
        }
        catch (err) {
            throw new Error("No se pudo eliminar el producto");
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.model.findOne({ _id: cartId });
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
            const updatedCart = await this.model.findByIdAndUpdate(
                cartId,
                { products },
                { new: true }
            );
            return updatedCart;
        } catch (err) {
            throw new Error('Error al actualizar los productos en el carrito');
        }
    }

    async updateProductCart(cartId, productId, quantity) {
        try {
            const cart = await this.model.findOne({ _id: cartId });
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