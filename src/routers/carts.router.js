import { Router } from 'express';
import CartManager from '../CartManager.js'
import ProductManager from '../ProductManager.js';

const cartManager = new CartManager();
const productManager = new ProductManager('./products.json');

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    try {
        await cartManager.addCart();
        res.status(201).send("Agregado correctamente");
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        let prod = await productManager.getProductById(req.params.pid)
        await cartManager.addProductToCart(req.params.cid, prod);
        res.status(201).send(prod);
    } catch (err) {
        res.status(400).send({ err });
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        let carts = await cartManager.getCarts();
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