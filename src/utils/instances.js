import ProductController from '../controllers/ProductController.js';
import CartController from '../controllers/CartController.js';

export const productController = new ProductController('./products.json');
export const cartController = new CartController();