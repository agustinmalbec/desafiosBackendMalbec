import { Router } from 'express';
import productController from '../controllers/product.controller.js';
import { io } from '../utils/socket.js';
import { generateProduct } from '../utils/generate.js';
import { isAdmin } from '../middleware/auth.middleware.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit = 4, page = 2, sort, price } = req.query;
        const products = await productController.getProducts(limit, page);
        const prevPage = products.prevPage;
        const nextPage = products.nextPage;
        const prevLink =
            prevPage &&
            `${req.baseUrl}/?page=${prevPage}&limit=${limit}&sort=${sort || ""
            }&price=${encodeURIComponent(price || "")}${price ? `&price=${price}` : ""
            }`;

        const nextLink =
            nextPage &&
            `${req.baseUrl}/?page=${nextPage}&limit=${limit}&sort=${sort || ""
            }&price=${encodeURIComponent(price || "")}${price ? `&price=${price}` : ""
            }`;
        res.send({ status: "success", payload: products, prevLink: prevLink, nextLink: nextLink });
    } catch (err) {
        req.logger.error(`No se obtuvieron los productos`);
        res.status(400).send({ err });
    }
});

productsRouter.post('/', isAdmin, async (req, res) => {
    try {
        let product = req.body;
        await productController.addProduct(product);
        res.status(201).send(product);
        io.emit('productsUpdated', await productController.getProducts());
    } catch (err) {
        req.logger.error(`No se agrego el producto`);
        res.status(400).send({ err });
    }
});

/* productsRouter.get('/:pid', async (req, res) => {
    try {
        const product = await productController.getProductById(req.params.pid)
        if (product) {
            return res.send(product);
        } else {
            return res.send(console.log('El producto no se encontro'));
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ err });
    }
}); */

productsRouter.put('/:pid', isAdmin, async (req, res) => {
    try {
        let product = req.body;
        await productController.updateProduct(req.params.pid, product);
        return res.send(product);
    } catch (err) {
        req.logger.error(`No se actualizo el producto`);
        res.status(400).send({ err });
    }
});

productsRouter.delete('/:pid', isAdmin, async (req, res) => {
    const id = req.params.pid;
    try {
        productController.deleteProduct(id);
        res.send();
        io.emit('productsUpdated', await productController.getProducts());
    } catch (err) {
        req.logger.error(`No se elimino el producto`);
        res.status(400).send({ err });
    }
});

productsRouter.get('/mockingproducts', (req, res) => {
    try {
        let products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
            productController.addProduct(generateProduct());
        }
        res.json(products);
    } catch (err) {
        req.logger.error(`No se agregaron los productos`);
        res.status(500).send(err)
    }

});

export default productsRouter;