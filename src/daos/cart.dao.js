import cartModel from "../models/cart.model.js";

class CartDAO {
    constructor() {
        this.model = cartModel;
    }

    addCart(cart) {
        return this.model.create(cart);
    }

    getCarts() {
        return this.model.find();
    }

    getSinleCart(id) {
        return this.model.findOne({ _id: id }).lean();
    }

    deleteCart(id) {
        return this.model.findByIdAndDelete({ _id: id });
    }

    updateCart(id, products) {
        return this.model.findByIdAndUpdate(id, { products }, { new: true });
    }
}

const cartDAO = new CartDAO();
export default cartDAO;