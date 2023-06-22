import { cartModel } from "../models/Cart.model.js";
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
            console.log("No se pudo agregar el carrito");
        }
    }

    async addProductToCart(id, productId) {
        try {
            const cart = await this.model.findOne({ _id: id });
            const prod = await productService.getProductById(productId);
            cart.products.push(prod);
            return await cart.save();
        }
        catch (err) {
            console.log("No se pudo agregar el producto");
        }
    }

    async getCarts() {
        try {
            return await this.model.find();
        }
        catch (err) {
            return console.log("No se pudo obtener los carritos");
        }
    }

}