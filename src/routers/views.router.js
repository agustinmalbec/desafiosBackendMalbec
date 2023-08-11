import { Router } from "express";
import { productService } from '../utils/instances.js';
import { cartService } from "../utils/instances.js";
import { middlewarePassportJWT } from "../middleware/jwt.middleware.js";
//import { isAuth, isGuest } from "../middleware/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get('/', middlewarePassportJWT, async (req, res) => {
    try {
        const { limit = 10, page = 1, category, sort } = req.query;
        const data = await productService.getProducts(limit, page, category, sort);
        const user = req.user;
        delete user.password;
        data.category = category;
        let isAdmin = false;
        if (user.email == 'adminCoder@coder.com') isAdmin = true;
        res.render('index', {
            data: data,
            title: 'Productos',
            user,
            isAdmin
        });
    } catch (error) {
        res.status(400).send({ err });
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
        const data = await cartService.getSinleCart(cartId);
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