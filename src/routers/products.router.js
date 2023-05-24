import { Router } from 'express';
import { productController } from '../utils/instances.js';
import { io } from '../utils/socket.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        let products = await productController.getProducts();
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
        productController.addProduct(product);
        res.status(201).send(product);
        io.emit('productsUpdated', await productController.getProducts());
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        let products = await productController.getProducts();
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
        await productController.updateProduct(req.params.pid, product);
        return res.send(product);
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        productController.deleteProduct(id);
        res.send();
        io.emit('productsUpdated', await productController.getProducts());
    } catch (err) {
        res.status(400).send({ err });
    }
});

export { productsRouter };