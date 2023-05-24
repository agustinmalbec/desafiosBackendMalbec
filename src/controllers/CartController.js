import { existsSync, writeFileSync, promises } from 'fs';

export default class CartController {

    constructor() {
        this.path = './carts.json';
        if (!existsSync(this.path)) {
            writeFileSync(
                this.path,
                JSON.stringify([]));
        }
    }

    async addCart() {
        try {
            const actualCarts = await this.getCarts();
            const cart = { products: [] };

            cart.id = actualCarts.length + 1;

            actualCarts.push(cart);
            await promises.writeFile(
                this.path,
                JSON.stringify(actualCarts)
            );

        }

        catch (err) {
            console.log("No se pudo agregar el carrito");
        }
    }

    async addProductToCart(id, product) {
        try {
            const actualCarts = await this.getCarts();
            const find = actualCarts[id - 1].products.find((prod) => prod.id == product.id);

            if (!find) {
                actualCarts[id - 1].products.push({ "id": product.id, "quantity": 1 });
            }
            if (find) {
                find.quantity++;
            }

            console.log(product.id)
            await promises.writeFile(
                this.path,
                JSON.stringify(actualCarts)
            );
        }
        catch (err) {
            console.log("No se pudo agregar el producto");
        }
    }

    async getCarts() {
        try {
            const actualCarts = await promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualCarts);
        }
        catch (err) {
            return console.log("No se pudo obtener los carritos");
        }
    }

}

/* const pr = new CartController();
const test = async () => {

    try {
         await pr.addCart();
        await pr.addCart();
        await pr.addCart(); 
        console.log(await pr.getCarts())
    } catch (err) {
        console.log('Algo salio mal')
    }
}
test(); */
