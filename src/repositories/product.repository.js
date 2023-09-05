import productDAO from "../daos/product.dao.js";
import ProductDTO from "../dtos/product.dto.js";

class ProductService {
    constructor() {
        this.service = productDAO;
    }

    async getProducts(limit, page, filter, sort) {
        return await this.service.getProducts(limit, page, filter, sort);
    }

    async addProduct(product) {
        const newProduct = new ProductDTO(product);
        return await this.service.addProduct(newProduct);
    }

    async getProductById(productId) {
        return await this.service.getProductById(productId);
    }

    async getProductByCode(productCode) {
        return await this.service.getProductByCode(productCode);
    }

    async updateProduct(id, product) {
        return await this.service.updateProduct(id, product);

    }

    async deleteProduct(id) {
        return await this.service.deleteProduct(id);
    }
}

const productService = new ProductService();

export default productService;