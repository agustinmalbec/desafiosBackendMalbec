import express from "express";
import { productsRouter } from "./routers/products.router.js";
import { cartRouter } from "./routers/carts.router.js";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routers/views.router.js";
import { server, app } from './utils/socket.js';

// Servidor express

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
server.listen(8080, () => console.log('Estoy escuchando'));


// Configuracion handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartRouter);
