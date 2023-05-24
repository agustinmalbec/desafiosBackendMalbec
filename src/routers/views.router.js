import { Router } from "express";
import { productController } from '../utils/instances.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const products = await productController.getProducts();
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

export { viewsRouter };