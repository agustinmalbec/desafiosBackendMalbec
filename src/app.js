import express from "express";
import { server, app } from './utils/socket.js';
import session from 'express-session';

import mongoose from 'mongoose';
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import enviroment from './config/enviroment.config.js'

import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import messagesRouter from "./routers/messages.router.js";
import userRouter from "./routers/user.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routers/views.router.js";
import sessionRouter from "./routers/session.router.js";

import MongoStore from 'connect-mongo';
import { loggerMiddleware } from "./middleware/logger.middleware.js";

// Servidor express

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

/* app.use(session({
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
); */

// Configuracion handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(session({
    secret: enviroment.KEY,
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser(enviroment.KEY));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(enviroment.DB_LINK);

// Rutas
app.use('/', viewsRouter);
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartRouter);
app.use('/api/chat', messagesRouter);
app.use('/api/users', userRouter);
app.use('/api/session', sessionRouter);


server.listen(enviroment.PORT, () => console.log('Estoy escuchando el puerto', enviroment.PORT));