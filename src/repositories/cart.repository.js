import cartDAO from "../daos/cart.dao.js";

class CartService {
    constructor() {
        this.service = cartDAO;
    }

    async addCart(cart) {
        return await this.service.addCart(cart);
    }

    async addProductToCart(cart) {
        return await this.service.addProductToCart(cart);
    }

    async getCarts() {
        return await this.service.getCarts();
    }

    async getSinleCart(id) {
        return await this.service.getSinleCart(id);
    }

    async deleteCart(id) {
        return await this.service.deleteCart(id);
    }

    async updateCart(id, products) {
        return await this.service.updateCart(id, products);
    }
}

const cartService = new CartService();
export default cartService;