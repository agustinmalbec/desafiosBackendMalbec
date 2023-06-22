import mongoose from "mongoose";
import { productSchema } from "./product.model.js";

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            productSchema,
            quantity: Number,
        },
    }],
});

export const cartModel = mongoose.model('carts', cartSchema);