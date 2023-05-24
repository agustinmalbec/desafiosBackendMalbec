import { existsSync, writeFileSync, promises } from 'fs';

export default class ProductController {

    constructor(path) {
        this.path = path;
        if (!existsSync(this.path)) {
            writeFileSync(
                this.path,
                JSON.stringify([]));
        }
    }

    async getProducts() {
        try {
            const actualProducts = await promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualProducts);
        }
        catch (err) {
            return console.log("No se pudo obtener los productos");
        }
    }

    async addProduct(product) {
        try {
            const actualProducts = await this.getProducts();
            product.id = actualProducts.length + 1;

            actualProducts.push(product);
            await promises.writeFile(
                this.path,
                JSON.stringify(actualProducts)
            );
        }
        catch (err) {
            console.log("No se pudo agregar el producto");
        }
    }

    async getProductById(productId) {
        const actualProducts = await this.getProducts();
        const find = actualProducts.find((product) => product.id == productId);
        if (find) {
            return find;
        } else {
            console.log("Not found");
        }
    }

    async updateProduct(productId, product) {
        try {
            const actualProducts = await this.getProducts();
            const index = actualProducts.findIndex((prod) => prod.id == productId);
            product.id = productId;
            actualProducts[index] = product;

            await promises.writeFile(
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
            await promises.writeFile(
                this.path,
                JSON.stringify(newProducts)
            );
        }
        catch (err) {
            console.log("No se pudo borrar el producto");
        }

    }
}

/* const pm = new ProductController('./products.json');


const test = async () => {

    try {

        await pm.addProduct("monr", "asd", 124, "asd", 4556, 1);
        await pm.addProduct("monitor", "asd", 123, "asd", 44, 4);
        await pm.addProduct("fdgfh", "ght", 5, "a", 43225, 99);
        await pm.addProduct("mocvn", "c", 8, "e", 458, 8);
        await pm.addProduct("f", "aeeeee", 34, "b", 4, 5);
        await pm.addProduct("wvbbnvbnvbnvbn", "aqqqq", 100000, "vb", 45, 2);
        await pm.addProduct("f", "aeeeee", 34, "b", 5, 6);
        await pm.addProduct("ewrvj", "aqfgq", 10230, "vt", 49, 8);
        await pm.addProduct("f", "aereee", 33, "q", 8, 7);
        await pm.addProduct("j", "aqwq", 1004500, "w", 46, 9);


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
test();     */