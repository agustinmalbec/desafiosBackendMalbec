import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { productController } from '../utils/instances.js';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('Nuevo Cliente conectado');
    socket.emit('products', await productController.getProducts());
});