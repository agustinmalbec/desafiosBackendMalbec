import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    let cart = req.body;
    try {
        await cartController.addCart(cart);
        res.status(201).send("Agregado correctamente");
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        await cartController.addProductToCart(req.params.cid, Number(req.params.pid));
        res.status(201).send("Agregado correctamente");
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.get('/', async (req, res) => {
    try {
        let carts = await cartController.getCarts();
        return res.status(201).send(carts);
    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartController.getSinleCart(cartId);
        if (cart) {
            return res.status(201).send(cart);
        } else {
            return res.send(console.log('El carrito no se encontro'));
        }

    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const deleted = await cartController.deleteProductFromCart(req.params.cid, req.params.pid);
        res.status(201).send(deleted);
    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const deleted = await cartController.deleteCart(req.params.cid);
        res.status(201).send(deleted);
    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.put('/:cid', async (req, res) => {
    try {
        const cartUpdated = await cartController.updateCart(req.params.cid, req.body);
        res.status(201).send(cartUpdated);
    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const productUpdated = await cartController.updateProductCart(req.params.cid, req.params.pid, quantity);
        res.status(201).send(productUpdated);
    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.put('/:cid/purchase', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).send({ err });
    }
});

export default cartRouter;