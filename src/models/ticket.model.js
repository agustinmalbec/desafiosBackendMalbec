import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_datetime: new Date(),
    amount: Number,
    purchase: String,
});

export const ticketSchemaModel = mongoose.model('tickets', ticketSchema);