const socket = io();
const cart = '';

function getUserCart(data) {
    cart = data;
}

function addToCart(data) {
    socket.emit('addProduct', cart, data);
}
