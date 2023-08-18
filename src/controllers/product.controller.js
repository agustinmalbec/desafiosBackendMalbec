import productService from "../services/product.service.js";

class ProductController {
    constructor() {
        this.controller = productService;
    }

    async getProducts(limit = 10, page = 1, category = false, sort) {
        try {
            let filter = {};
            if (category) {
                filter = { category };
            }
            if (!limit) {
                limit = 10;
            }
            return await this.controller.getProducts(limit, page, filter, sort)
        } catch (error) {
            throw new Error("No se pudo obtener los productos");
        }
    }

    async addProduct(product) {
        try {
            return await this.controller.addProduct(product);
        }
        catch (err) {
            throw new Error("No se pudo agregar el producto");
        }
    }

    async getProductById(id) {
        try {
            return await this.controller.getProductById(id);
        }
        catch (err) {
            throw new Error("No se encontro el producto");
        }
    }

    async getProductByCode(productCode) {
        try {
            return await this.controller.getProductByCode(productCode);
        }
        catch (err) {
            throw new Error("No se encontro el producto");
        }
    }

    async updateProduct(id, product) {
        try {
            if (!id) {
                throw new Error('Missing required fields');
            }
            return await this.controller.updateProduct(id, product);
        }
        catch (err) {
            throw new Error("No se pudo modificar el producto")
        }
    }
}

const productController = new ProductController();
export default productController;