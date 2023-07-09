import productModel from "../models/product.model.js";


export default class ProductMongoService {
    constructor() {
        this.model = productModel;
    }

    async getProducts(limit = 10, page = 1, category = false, sort) {
        try {
            let filter = {};
            if (category) {
                filter = { category };
            }
            return this.model.paginate(filter, { lean: true, limit, page, filter, sort: { price: sort } });
        }
        catch (err) {
            return console.log("No se pudo obtener los productos");
        }
    }

    async addProduct(product) {
        try {
            return await this.model.create(product);
        }
        catch (err) {
            console.log("No se pudo agregar el producto");
        }
    }

    async getProductById(productId) {
        try {
            return await this.model.findOne({ _id: productId });
        }
        catch (err) {
            console.log("No se encontro el producto");
        }
    }

    async updateProduct(uid, product) {
        try {
            if (!uid) {
                throw new Error('Missing required fields');
            }
            return await this.model.updateOne({ _id: uid }, product);
        }
        catch (err) {
            console.log("No se pudo modificar el producto");
        }

    }

    async deleteProduct(uid) {
        try {
            return this.model.deleteOne({ _id: uid });
        }
        catch (err) {
            console.log("No se pudo borrar el producto");
        }

    }
}
