import { Router } from "express";
import passport from "passport";
import { generateToken, middlewarePassportJWT, authToken } from "../middleware/jwt.middleware.js";

const privatekey = 'privatekey';

const userRouter = Router();

userRouter.post('/', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/');
});

userRouter.post('/authentication', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    if (!req.user) return res.status(400).send('User not found');
    const user = req.user;
    console.log(user)
    delete user.password;
    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60000,
    }).redirect('/');
    //req.session.user = user;
    //res.redirect('/');
});

userRouter.get('/private', middlewarePassportJWT, (req, res) => {
    res.status(200).send({ message: 'Private route', user: req.user });
});

userRouter.get('/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            res.redirect('/');
        } else {
            res.status(500).send('No se pudo finalizar la sesion');
        }
    });
});

export default userRouter;