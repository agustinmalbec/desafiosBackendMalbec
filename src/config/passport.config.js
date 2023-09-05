import passport from "passport";
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import userController from "../controllers/user.controller.js";
import { encryptPassword, comparePassword } from '../utils/encrypt.js';
import { Strategy, ExtractJwt } from 'passport-jwt';
import enviroment from "./enviroment.config.js";
import cartController from "../controllers/cart.controller.js";

const localStrategy = local.Strategy;
const jwtStrategy = Strategy;
const jwtExtract = ExtractJwt;

const initializePassport = () => {
    passport.use('register', new localStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const user = await userController.getUserByEmail(username);
            if (user) {
                return done(null, false, {
                    message: 'User already exists',
                });
            }
            const hashedPassword = encryptPassword(password);

            const newUser = await userController.createUser({
                first_name,
                last_name,
                email: username,
                age,
                password: hashedPassword,
                cart: await cartController.addCart(),
            });
            return done(null, newUser);
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        if (user.email !== enviroment.ADMIN_USERNAME) {
            done(null, user._id);
        }
        done(null, user)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userController.getUserById(id);
        done(null, user);
    });



    passport.use('github', new GitHubStrategy({
        clientID: enviroment.GITHUB_CLIENT_ID,
        clientSecret: enviroment.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            let user = await userController.getUserByEmail(profile._json.email);
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: '',
                };
                user = await userController.createUser(newUser);
                done(null, user);
            } else {
                done(null, user);
            };
        } catch (error) {
            done(error, false);
        };

    }));


    passport.use('current', new jwtStrategy({
        jwtFromRequest: jwtExtract.fromExtractors([cookieExtractor]),
        secretOrKey: enviroment.SECRET_KEY,
    },
        (payload, done) => {
            done(null, payload);
        }
    ),
        async (payload, done) => {
            try {
                return done(null, payload);
            } catch (error) {
                done(error);
            }
        }
    );
};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

export default initializePassport;