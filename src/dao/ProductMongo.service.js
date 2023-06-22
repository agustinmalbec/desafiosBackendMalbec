import { productModel } from "../models/product.model.js";


export default class ProductMongoService {
    constructor() {
        this.model = productModel;
    }

    async getProducts() {
        try {
            return await this.model.find();
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
