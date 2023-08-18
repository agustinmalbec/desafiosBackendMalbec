import productModel from "../models/product.model.js";

class ProductDAO {
    constructor() {
        this.model = productModel;
    }

    getProducts(limit, page, filter, sort) {
        return this.model.paginate(filter, { lean: true, limit, page, filter, sort: { price: sort } });
    }

    addProduct(product) {
        return this.model.create(product);
    }

    getProductById(id) {
        return this.model.findOne({ _id: id });
    }

    getProductByCode(productCode) {
        return this.model.findOne({ code: productCode });
    }

    updateProduct(id, product) {
        return this.model.updateOne({ _id: id }, product);

    }

    deleteProduct(id) {
        return this.model.deleteOne({ _id: id });
    }
}

const productDAO = new ProductDAO();
export default productDAO;