import { Router } from "express";
import passport from "passport";
import { generateToken, middlewarePassportJWT } from "../middleware/jwt.middleware.js";
import UserDTO from "../dtos/user.dto.js";

const sessionRouter = Router();

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }, async (req, res) => { }));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60000,
    }).redirect('/');
});

sessionRouter.get('/current', middlewarePassportJWT, (req, res) => {
    const { user } = req.user;
    delete user.password;
    res.status(200).send({ message: 'Sesion actual: ', user: new UserDTO(user) });
});

export default sessionRouter;