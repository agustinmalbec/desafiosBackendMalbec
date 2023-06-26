import { Router } from "express";
import { productService } from '../utils/instances.js';
import { messagesService } from "../dao/Message.service.js";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.render('index', { products });
    } catch (err) {
        res.status(400).send({ err });
    }
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts', {});
    } catch (err) {
        res.status(400).send({ err });
    }

})

viewsRouter.get('/chat', async (req, res) => {
    try {
        res.render('chat', {});
    } catch (err) {
        res.status(500).send({ err });
    }
});

export { viewsRouter };