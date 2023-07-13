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

mongoose.connect(
    'mongodb+srv://agustinmalbec:123@ecommerce.ewu7s82.mongodb.net/?retryWrites=true&w=majority'
);


