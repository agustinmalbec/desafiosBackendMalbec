import { Router } from "express";
import passport from "passport";
import { generateToken } from "../middleware/jwt.middleware.js";

const userRouter = Router();

userRouter.post('/', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/');
});

userRouter.post('/authentication', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    const user = req.user;
    delete user.password;
    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60000,
    }).redirect('/');
    //req.session.user = user;
    //res.redirect('/');
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