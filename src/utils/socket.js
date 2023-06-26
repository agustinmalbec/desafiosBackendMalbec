import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { productService } from '../utils/instances.js';
import { messagesService } from '../dao/Message.service.js';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('Nuevo Cliente conectado');

    socket.emit('products', await productService.getProducts());
    socket.emit('messages', await messagesService.getAllMessages());
    socket.on('sendMessage', async (message) => {
        await messagesService.addMessage(message);/* 
        io.emit('newMessage', message); */
        socket.emit('messages', await messagesService.getAllMessages());
    });

});