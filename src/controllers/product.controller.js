import productService from "../repositories/product.repository.js";
import CustomErrors from "../utils/customError.js";

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
            CustomErrors.createError('Error al obtener los productos', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async addProduct(product) {
        try {
            return await this.controller.addProduct(product);
        }
        catch (err) {
            CustomErrors.createError('Producto ya existe', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getProductById(id) {
        try {
            return await this.controller.getProductById(id);
        }
        catch (err) {
            CustomErrors.createError('No se consigue el producto por id', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async getProductByCode(productCode) {
        try {
            return await this.controller.getProductByCode(productCode);
        }
        catch (err) {
            CustomErrors.createError('No se consigue el producto por codigo', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async updateProduct(id, product) {
        try {
            if (!id) {
                CustomErrors.createError('No se obtuvo el id', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
            }
            return await this.controller.updateProduct(id, product);
        }
        catch (err) {
            CustomErrors.createError('No se actualizo el producto', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
        }
    }

    async deleteProduct(pid) {
        try {
            return await this.controller.deleteProduct(pid);
        } catch (err) {
            CustomErrors.createError('No se elimino el producto', generateErrorProduct({ err }), 'Product error', ErrorCodes.PRODUCT_ERROR);
        }
    }
}

const productController = new ProductController();
export default productController;