import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        default: [],
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            }
        ]
    },
});

cartSchema.pre('find', function () {
    this.populate('products.product');
});
cartSchema.pre('findOne', function () {
    this.populate('products.product');
});

const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;