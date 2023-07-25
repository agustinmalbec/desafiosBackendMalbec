import passport from "passport";
import GitHubStrategy from 'passport-github2';
import userService from "../dao/User.service.js";

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.121bc709b88c8123',
        clientSecret: 'bb2f24f35e1393db9ec0fe1bd8e295ad10f8891c',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getUserByEmail(profile._json.email);
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: '',
                };
                user = await userService.createUser(newUser);
                done(null, user);
            } else {
                done(null, user);
            };
        } catch (error) {
            done(error, false);
        };

    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id);
        done(null, user);
    });
};

export default initializePassport;