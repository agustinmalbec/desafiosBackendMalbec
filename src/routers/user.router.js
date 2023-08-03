import { Router } from "express";
import passport from "passport";
import userService from "../dao/User.service.js";
import { comparePassword } from "../utils/encrypt.js";
import { generateToken, middlewarePassportJWT, authToken } from "../middleware/jwt.middleware.js";

const privatekey = 'privatekey';

const userRouter = Router();

userRouter.post('/', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/');
});

/* userRouter.post('/authentication', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    if (!req.user) return res.status(400).send('User not found');
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
    let user = {}
    const { username, password } = req.body;
    if (username === 'adminCoder@coder.com') {
        user.first_name = 'Coder';
        user.last_name = 'House';
        user.email = 'adminCoder@coder.com';
        user.password = '123';
        if (user.password !== password) throw new Error('Contraseña incorrecta');
    } else {
        user = await userService.getUserByEmail(username);
    };
    if (!user) {
        return console.log('User not found');
    }
    if (!comparePassword(user, password) && username !== 'adminCoder@coder.com') {
        return console.log('Invalid data');
    }
    const token = generateToken({ email: user.email, password: user.password });
    delete user.password;
    console.log(token)
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