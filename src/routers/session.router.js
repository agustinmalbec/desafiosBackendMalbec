import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }, async (req, res) => { }));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

export { sessionRouter };