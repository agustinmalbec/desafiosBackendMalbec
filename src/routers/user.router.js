import { Router } from "express";
import userService from "../dao/User.service.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.js";

const userRouter = Router();

userRouter.post('/', async (req, res) => {
    const user = { ...req.body, password: encryptPassword(req.body.password) };
    try {
        const newUser = await userService.createUser(user);
        delete newUser.password;
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.post('/authentication', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = {};
        if (email === 'adminCoder@coder.com') {
            user.first_name = 'Coder';
            user.last_name = 'House';
            user.email = 'adminCoder@coder.com';
            user.password = '123';
            if (user.password !== password) throw new Error('Contraseña incorrecta');
        } else {
            user = await userService.getUserByEmail(email);
        }
        if (!user) throw new Error('Ese usuario no existe');
        if (!comparePassword(user, password) && email !== 'adminCoder@coder.com') throw new Error('Contraseña incorrecta');
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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