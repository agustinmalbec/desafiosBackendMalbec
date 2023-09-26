import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';
import productController from '../controllers/product.controller.js';
import ticketController from '../controllers/ticket.controller.js';
import userController from '../controllers/user.controller.js';
import { isUser } from '../middleware/auth.middleware.js';

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
    let cart = req.body;
    try {
        await cartController.addCart(cart);
        res.status(201).send("Agregado correctamente");
    } catch (err) {
        req.logger.error(`No se creo el carrito`);
        res.status(400).send({ err });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const addProdCart = await cartController.addProductToCart(req.params.cid, req.params.pid);
        if (!addProdCart) {
            req.logger.warn(`No hay stock del producto`);
        } else {
            req.logger.info(`Se agrego el producto`);
        }
        res.status(201).send(addProdCart);
    } catch (err) {
        req.logger.error(`No se pudo agregar el producto al carrito`);
        res.status(400).send({ err });
    }
})

cartRouter.get('/', async (req, res) => {
    try {
        let carts = await cartController.getCarts();
        return res.status(201).send(carts);
    } catch (err) {
        req.logger.error(`El carrito no se encontro`);
        res.status(400).send({ err });
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartController.getSinleCart(cartId);
        if (cart) {
            res.status(201).send(cart);
        } else {
            req.logger.error(`El carrito no se encontro`);
            res.send('El carrito no se encontro');
        }
    } catch (err) {
        req.logger.error(`El carrito no se encontro`);
        res.status(400).send({ err });
    }
});

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const deleted = await cartController.deleteProductFromCart(req.params.cid, req.params.pid);
        res.status(201).send(deleted);
    } catch (err) {
        req.logger.error(`No se elimino el producto del carrito`);
        res.status(400).send({ err });
    }
});

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const deleted = await cartController.deleteCart(req.params.cid);
        res.status(201).send(deleted);
    } catch (err) {
        req.logger.error(`No se elimino el carrito`);
        res.status(400).send({ err });
    }
});

cartRouter.put('/:cid', async (req, res) => {
    try {
        const cartUpdated = await cartController.updateCart(req.params.cid, req.body);
        res.status(201).send(cartUpdated);
    } catch (err) {
        req.logger.error(`No se actualizo el carrito`);
        res.status(400).send({ err });
    }
});

cartRouter.put('/:cid/products/:pid', isUser, async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const productUpdated = await cartController.updateProductCart(req.params.cid, req.params.pid, quantity);
        res.status(201).send(productUpdated);
    } catch (err) {
        req.logger.error(`No se actualizo el producto del carrito`);
        res.status(400).send({ err });
    }
});

cartRouter.put('/:cid/purchase', async (req, res) => {
    try {
        const cart = await cartController.getSinleCart(req.params.cid);
        const finalCart = [];
        const outOfStock = [];
        let amount = 0;
        const user = await userController.getUserByCart(cart);
        cart.products.forEach(async element => {
            const productId = element.product._id;
            const product = await productController.getProductById(productId);
            if (element.quantity > product.stock) {
                outOfStock.push(product._id);
            } else {
                product.stock -= element.quantity;
                amount += product.price * element.quantity;
                await productController.updateProduct(productId, product);
                finalCart.push(product);
            }
        });

        setTimeout(async () => {
            if (amount > 0) {
                await ticketController.addTicket({ amount: amount, email: user.email });
                await cartController.updateCart(cart, []);
            }
            if (outOfStock.length > 0) {
                res.send(outOfStock);
            } else {
                res.send('Compra realizada con exito');
            }
        }, 100);


    } catch (err) {
        req.logger.error(`No se concreto la compra`);
        res.status(400).send(err);
    }
});

export default cartRouter;