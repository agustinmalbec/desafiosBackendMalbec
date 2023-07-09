import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { productService } from '../utils/instances.js';
import { messagesService } from '../dao/Message.service.js';
import { cartService } from '../utils/instances.js';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);
let us;

io.on('connection', async (socket) => {
    console.log('Nuevo Cliente conectado');

    socket.emit('products', await productService.getProducts());
    socket.emit('messages', await messagesService.getAllMessages());
    socket.on('newUser', async (user) => {
        us = await messagesService.addUser(user);
    });
    socket.on('sendMessage', async (message) => {
        await messagesService.addMessage(us, message);
        socket.emit('messages', await messagesService.getAllMessages());
    });
    socket.on('addProduct', async (product) => {
        console.log(product)
        await cartService.addProductToCart('649ee9de4a5978ad76a30393', product)
    })
});