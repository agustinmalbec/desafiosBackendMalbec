import passport from "passport";
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import userService from "../dao/User.service.js";
import { encryptPassword, comparePassword } from '../utils/encrypt.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

const LocalStrategy = local.Strategy;
const jwtStrategy = Strategy;
const jwtExtract = ExtractJwt;

const initializePassport = () => {
    passport.use('current', new jwtStrategy({
        jwtFromRequest: jwtExtract.fromExtractors([cookieExtractor]),
        secretOrKey: 'privatekey',
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

    passport.use('register', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, username, password, done) => {
        const { first_name, last_name } = req.body;
        try {
            const user = await userService.getUserByEmail(username);

            if (user) {
                return done(null, false, { message: 'User alredy exists' });
            }

            const hashedPassword = encryptPassword(password);
            const newUser = await userService.createUser({
                first_name,
                last_name,
                email: username,
                password: hashedPassword
            });
            return done(null, newUser);
        } catch (error) {
            done(error);
        };
    }));

    passport.serializeUser((user, done) => {
        if (user.email !== 'adminCoder@coder.com') {
            done(null, user._id);
        }
        done(null, user)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id);
        done(null, user);
    });

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            console.log('asd')
            let user = {};
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
                return done(null, false, { message: 'User not found' });
            }
            if (!comparePassword(user, password) && username !== 'adminCoder@coder.com') {
                return done(null, false, { message: 'Invalid data' });
            }
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

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
};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

export default initializePassport;