import { Router } from 'express';
import { cartService } from '../utils/instances.js';
import { productService } from '../utils/instances.js';

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    let cart = req.body;
    try {
        await cartService.addCart(cart);
        res.status(201).send("Agregado correctamente");
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const prod = await productService.getProductById(req.params.pid);
        await cartService.addProductToCart(req.params.cid, prod._id);
        res.status(201).send(prod);
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.get('/', async (req, res) => {
    try {
        let carts = await cartService.getCarts();
        return res.status(201).send(carts);
    } catch (err) {
        res.status(400).send({ err });
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        let carts = await cartService.getCarts();
        let cartId = carts.find((cart) => {
            return cart.id == req.params.cid;
        })

        if (cartId) {
            return res.status(201).send(cartId);
        } else {
            return res.send(console.log('El carrito no se encontro'));
        }

    } catch (err) {
        res.status(400).send({ err });
    }
});

export { cartRouter };