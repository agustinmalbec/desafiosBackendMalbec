class ProductManager {
    #id = 0;
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = { title, description, price, thumbnail, code, stock };

        product.id = this.#getID();

        const find = this.products.find((product)=>product.code===code)

         if (find) {
            console.log("El producto ya existe");
            return;
        } 
        this.products.push(product);
    }

    #getID() {
        this.#id++;
        return this.#id;
    }

    getProductById(productId) {
        const find = this.products.find((product)=>product.id===productId)
        if(find){
            return find;
        }else{
            console.log("Not found");
        }
    }
}

const pm = new ProductManager();
console.log(pm.getProducts())
pm.addProduct("monitor", "asd", 123, "asd", 455);
pm.addProduct("monr", "asd", 124, "asd", 4556, 1);

/* console.log(pm.products[0])
console.log(pm.products[1]) */

console.log(pm.getProductById(3))
