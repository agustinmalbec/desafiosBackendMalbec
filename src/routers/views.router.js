import { Router } from "express";
import productController from "../controllers/product.controller.js";
import cartController from "../controllers/cart.controller.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get('/', middlewarePassportJWT, isAuth, async (req, res) => {
    try {
        const { limit = 10, page = 1, category, sort } = req.query;
        const data = await productController.getProducts(limit, page, category, sort);
        const { user } = req.user;
        delete user.password;
        data.category = category;
        let isAdmin = false;
        if (user.role === 'admin') isAdmin = true;
        data.docs.cart = user.cart._id;
        res.render('index', {
            data: data,
            title: 'Productos',
            user,
            isAdmin
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts', {});
    } catch (err) {
        res.status(400).send({ err });
    }

});

viewsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const data = await cartController.getSinleCart(cartId);
        res.render('carts', { data: data.products });
    } catch (err) {
        res.status(500).send({ err });
    }
});

viewsRouter.get('/chat', async (req, res) => {
    try {
        res.render('chat', {});
    } catch (err) {
        res.status(500).send({ err });
    }
});

viewsRouter.get('/register', async (req, res) => {
    try {
        res.render('register', {
            title: 'Registrar un nuevo usuario',
        });
    } catch (err) {
        res.status(500).send({ err });
    }
});

viewsRouter.get('/login', async (req, res) => {
    try {
        res.render('login', {
            title: 'Inicia sesion',
        });
    } catch (err) {
        res.status(500).send({ err });
    }
});

export default viewsRouter;