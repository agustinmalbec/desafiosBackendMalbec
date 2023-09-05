import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import productController from '../controllers/product.controller.js';
import { messagesService } from '../daos/Message.service.js';
import cartController from '../controllers/cart.controller.js';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);
let us;

io.on('connection', async (socket) => {
    console.log('Nuevo Cliente conectado');

    socket.emit('products', await productController.getProducts());
    socket.emit('messages', await messagesService.getAllMessages());
    socket.on('newUser', async (user) => {
        us = await messagesService.addUser(user);
    });
    socket.on('sendMessage', async (message) => {
        await messagesService.addMessage(us, message);
        socket.emit('messages', await messagesService.getAllMessages());
    });
    socket.on('addProduct', async (product) => {
        await cartController.addProductToCart('64f5ef01135d3d0e6389e153', product);
    })
});