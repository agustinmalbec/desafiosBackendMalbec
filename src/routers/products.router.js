import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager('./products.json');

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
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
        productManager.addProduct(product);
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        let idProduct = products.find((prod) => {
            return prod.id == req.params.pid;
        })

        if (idProduct) {
            return res.send(idProduct);
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
        await productManager.updateProduct(req.params.pid, product);
        return res.send(product);
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        productManager.deleteProduct(id);
        res.send();
    } catch (err) {
        res.status(400).send({ err });
    }
});

export { productsRouter };