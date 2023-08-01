import express from "express";
import { productsRouter } from "./routers/products.router.js";
import { cartRouter } from "./routers/carts.router.js";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routers/views.router.js";
import { server, app } from './utils/socket.js';
import mongoose from 'mongoose';
import { messagesRouter } from "./routers/messages.router.js";
import userRouter from "./routers/user.router.js";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import initializePassport from "./config/passport.config.js";
import { sessionRouter } from "./routers/session.router.js";
import passport from "passport";
import cookieParser from "cookie-parser";

const privatekey = 'privatekey';

// Servidor express

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
server.listen(8080, () => console.log('Estoy escuchando'));
app.use(session({
    store: MongoStore.create({
        mongoUrl:
            'mongodb+srv://agustinmalbec:123@ecommerce.ewu7s82.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
        },
        ttl: 6000,
    }),
    secret: 'B2zdY3B$pHmxW%',
    resave: true,
    saveUninitialized: true,
})
);

const users = [{ username: 'admin', password: 'admin' }];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    console.log(user)
    if (!user) {
        res.status(401).send({ message: 'User not found' });
    }

    if (user.password !== password) {
        res.status(401).send({ message: 'User or Password not valid' });
    }

    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60000,
    }).send();
});

// Configuracion handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartRouter);
app.use('/api/chat', messagesRouter);
app.use('/api/users', userRouter);
app.use('/api/session', sessionRouter);

mongoose.connect(
    'mongodb+srv://agustinmalbec:123@ecommerce.ewu7s82.mongodb.net/?retryWrites=true&w=majority'
);

app.use(cookieParser('B2zdY3B$pHmxW%'));
initializePassport();
app.use(passport.initialize());/* 
app.use(passport.session()); */