import { Router } from "express";
import passport from "passport";

const userRouter = Router();

userRouter.post('/', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    res.redirect('/');
});

userRouter.post('/authentication', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    if (!req.user) return res.status(400).send('User not found');
    const user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect('/');
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