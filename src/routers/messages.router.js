import { Router } from 'express';
import { messagesService } from '../daos/Message.service.js';
import { isUser } from '../middleware/auth.middleware.js';

const messagesRouter = Router();

messagesRouter.get('/', async (req, res) => {
    try {
        const messagesHistory = await messagesService.getAllMessages();
        res.send(messagesHistory);
    } catch (err) {
        res.status(500).send({ err });
    }
});

messagesRouter.post('/', isUser, async (req, res) => {
    const message = req.body;
    try {
        const newMessage = await messagesService.addMessage(message);
        res.send(newMessage);
    } catch (err) {
        res.status(500).send({ err });
    }
});

export default messagesRouter;