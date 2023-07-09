import { Router } from "express";
import { productService } from '../utils/instances.js';
import { cartService } from "../utils/instances.js";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const { limit, page, category, sort } = req.query;
        const data = await productService.getProducts(limit, page, category, sort);
        data.category = category;
        console.log(data)
        res.render('index', data);
    } catch (err) {
        res.status(400).send({ err });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts', {});
    } catch (err) {
        res.status(400).send({ err });
    }

});

viewsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const data = await cartService.getSinleCart(cartId);
        res.render('carts', { data: data.products });
    } catch (err) {
        res.status(500).send({ err });
    }
});

viewsRouter.get('/chat', async (req, res) => {
    try {
        res.render('chat', {});
    } catch (err) {
        res.status(500).send({ err });
    }
});

export { viewsRouter };