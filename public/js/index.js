const socket = io();

/* function addToCart(productId) {

     socket.emit('addProduct', productId); 
} */

const btn = document.getElementById("input")

btn.addEventListener('click', (e) => {
    const data = e.target.value;
    console.log(data)
})
