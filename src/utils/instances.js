/* import ProductService from '../dao/Product.service,js';
import CartService from '../dao/Cart.service.js';

export const productService = new ProductService('./products.json');
export const cartService = new CartService(); */

import CartMongoService from '../dao/CartMongo.service.js';
import ProductMongoService from '../dao/ProductMongo.service.js';

export const productService = new ProductMongoService();
export const cartService = new CartMongoService();