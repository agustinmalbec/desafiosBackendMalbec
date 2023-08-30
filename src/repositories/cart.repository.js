import cartDAO from "../daos/cart.dao.js";
import CartDTO from "../dtos/cart.dto.js";

class CartService {
    constructor() {
        this.service = cartDAO;
    }

    addCart() {
        const newCart = new CartDTO();
        return this.service.addCart(newCart);
    }

    getCarts() {
        return this.service.getCarts();
    }

    getSinleCart(id) {
        return this.service.getSinleCart(id);
    }

    deleteCart(id) {
        return this.service.deleteCart(id);
    }

    updateCart(id, products) {
        return this.service.updateCart(id, products);
    }
}

const cartService = new CartService();
export default cartService;