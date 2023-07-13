import { Router } from "express";
import userService from "../dao/User.service.js";

const userRouter = Router();

userRouter.post('/', async (req, res) => {
    const user = req.body;
    try {
        const newUser = await userService.createUser(user);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.post('/authentication', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) throw new Error('Invalid data');
        if (user.password !== password) throw new Error('Invalid data');
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default userRouter;