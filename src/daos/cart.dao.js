import cartModel from "../models/cart.model.js";

class CartDAO {
    constructor() {
        this.model = cartModel;
    }

    async addCart(cart) {
        return await this.model.create(cart);
    }

    async addProductToCart(cart) {
        await this.model.save(cart);;
    }

    async getCarts() {
        return await this.model.find();
    }

    async getSinleCart(id) {
        return await this.model.findOne({ _id: id }).lean();
    }

    async deleteCart(id) {
        return await this.model.findByIdAndDelete({ _id: id });
    }

    async updateCart(id, products) {
        return await this.model.findByIdAndUpdate(id, { products }, { new: true });
    }
}

const cartDAO = new CartDAO();
export default cartDAO;