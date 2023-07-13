const socket = io();

function addToCart(data) {
    socket.emit('addProduct', data);
}
