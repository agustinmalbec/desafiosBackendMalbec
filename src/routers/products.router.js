import { Router, query } from 'express';
import { productService } from '../utils/instances.js';
import { io } from '../utils/socket.js';
import productModel from '../models/product.model.js';

const productsRouter = Router();



productsRouter.get('/', async (req, res) => {
    try {
        let products = await productService.getProducts();
        let limit = parseInt(req.query.limit);
        if (!limit) {
            res.send(products);
        } else {
            let shortListProducts = products.slice(0, limit)
            res.send(shortListProducts);
        }

    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        let product = req.body;
        productService.addProduct(product);
        res.status(201).send(product);
        io.emit('productsUpdated', await productService.getProducts());
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid)
        if (product) {
            return res.send(product);
        } else {
            return res.send(console.log('El producto no se encontro'));
        }

    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        let product = req.body;
        await productService.updateProduct(req.params.pid, product);
        return res.send(product);
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        productService.deleteProduct(id);
        res.send();
        io.emit('productsUpdated', await productService.getProducts());
    } catch (err) {
        res.status(400).send({ err });
    }
});

export { productsRouter };