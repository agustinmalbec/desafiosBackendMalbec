const fs = require('fs');
class ProductManager {
    #id = 0;
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(
                this.path,
                JSON.stringify([]));
        }
    }

    async getProducts() {
        try {
            const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualProducts);
        }
        catch (err) {
            return console.log("No se pudo obtener los productos");
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        try {
            const actualProducts = await this.getProducts();
            const product = { title, description, price, thumbnail, code, stock };

            product.id = this.#getID();

            const find = await actualProducts.find((product) => product.code === code);

            if (find) {
                console.log("El producto ya existe");
                return;
            }
            actualProducts.push(product);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualProducts)
            );
        }

        catch (err) {
            console.log("No se pudo agregar el producto");
        }
    }

    #getID() {
        this.#id++;
        return this.#id;
    }

    async getProductById(productId) {
        const actualProducts = await this.getProducts();
        const find = actualProducts.find((product) => product.id === productId);
        if (find) {
            return find;
        } else {
            console.log("Not found");
        }
    }

    async updateProduct(productId, value) {
        try {
            const actualProducts = await this.getProducts();
            const find = await actualProducts.find((product) => product.id === productId);
            if (find) {
                find.stock = value;
            } else {
                return console.log("Not found");
            }
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualProducts)
            );
        }
        catch (err) {
            console.log("No se pudo modificar el producto");
        }

    }

    async deleteProduct(productId) {
        try {
            const actualProducts = await this.getProducts();
            const newProducts = actualProducts.filter((product) => product.id != productId);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newProducts)
            );
        }
        catch (err) {
            console.log("No se pudo borrar el producto");
        }

    }
}

const pm = new ProductManager('./products.json');


const test = async () => {

    try {

        await pm.addProduct("monr", "asd", 124, "asd", 4556, 1);

        await pm.addProduct("monitor", "asd", 123, "asd", 455, 4);


        console.log(await pm.getProducts());
        console.log(await pm.getProductById(3));
        console.log(await pm.deleteProduct(1));
        console.log(await pm.getProducts());
        console.log(await pm.updateProduct(2, 999));
        console.log(await pm.getProducts());
    } catch (err) {
        console.log("Algo salio mal");
    }
};
test();