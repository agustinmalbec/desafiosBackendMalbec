import { messageModel } from '../models/message.model.js';

class MessagesService {
    constructor() {
        this.model = messageModel;
    }

    async getAllMessages() {
        return await this.model.find();
    }

    async addMessage(msj) {
        return await this.model.create({ message: msj });
    }
}

export const messagesService = new MessagesService();