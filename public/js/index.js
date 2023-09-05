const socket = io();
const cart = '';

function getUserCart(data) {
    const cartId = data.toString()
    const asd = JSON.stringify(data)
    console.log(asd)
    cart = data;
}

function addToCart(data) {
    socket.emit('addProduct', data);
}
