import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";
import { comparePassword } from "../utils/encrypt.js";
import { generateToken } from "../middleware/jwt.middleware.js";
import enviroment from "../config/enviroment.config.js";

const userRouter = Router();

userRouter.post('/', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/');
});

/* userRouter.post('/authentication', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    const user = req.user;
    delete user.password;
    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60000,
    }).redirect('/');
    //req.session.user = user;
    //res.redirect('/');
}); */

userRouter.post('/authentication', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = {};
        if (email === enviroment.ADMIN_USERNAME) {
            user.role = 'admin';
            user.email = enviroment.ADMIN_USERNAME;
            user.password = enviroment.ADMIN_PASSWORD;
            if (user.password !== password) throw new Error('Contraseña incorrecta');
        } else {
            user = await userController.getUserByEmail(email);
        }
        if (!user) throw new Error('Ese usuario no existe');
        if (!comparePassword(user, password) && email !== enviroment.ADMIN_USERNAME) throw new Error('Contraseña incorrecta');
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60000,
        }).redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.get('/logout', async (req, res) => {
    /* req.session.destroy((error) => {
        if (!error) {
            res.redirect('/');
        } else {
            res.status(500).send('No se pudo finalizar la sesion');
        }
    }); */
    res.clearCookie('token').redirect('/login')
});

export default userRouter;