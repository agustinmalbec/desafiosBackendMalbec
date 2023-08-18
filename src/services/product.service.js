import productDAO from "../daos/product.dao.js";

class ProductService {
    constructor() {
        this.service = productDAO;
    }

    getProducts(limit, page, filter, sort) {
        return this.service.getProducts(limit, page, filter, sort);
    }

    addProduct(product) {
        return this.service.addProduct(product);
    }

    getProductById(productId) {
        return this.service.getProductById(productId);
    }

    getProductByCode(productCode) {
        return this.service.getProductByCode(productCode);
    }

    updateProduct(id, product) {
        return this.service.updateProduct(id, product);

    }

    deleteProduct(id) {
        return this.service.deleteProduct(id);
    }
}

const productService = new ProductService();

export default productService;