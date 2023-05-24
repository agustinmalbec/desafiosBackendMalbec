import { Router } from 'express';
import { cartController } from '../utils/instances.js';
import { productController } from '../utils/instances.js';

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        await cartController.addCart();
        res.status(201).send("Agregado correctamente");
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        let prod = await productController.getProductById(req.params.pid)
        await cartController.addProductToCart(req.params.cid, prod);
        res.status(201).send(prod);
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        let carts = await cartController.getCarts();
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