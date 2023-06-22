import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: String,
});

export const messageModel = mongoose.model('messages', messageSchema);