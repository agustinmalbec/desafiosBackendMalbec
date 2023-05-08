import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager("./products.json");

app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log("Estoy escuchando");
});

app.get("/products/", async (req, res) => {
    try {
        let products = await productManager.getProducts();
        let limit = parseInt(req.query.limit);
        if (!limit) {
            return res.send(products);
        } else {
            let shortListProducts = products.slice(0, limit)
            return res.send(shortListProducts);
        }

    } catch (err) {
        res.send(err);
    }
});


app.get("/products/:pid", async (req, res) => {

    try {
        let products = await productManager.getProducts()
        let idProduct = products.find((prod) => {
            return prod.id == req.params.pid;

        })

        if (idProduct) {
            return res.send(idProduct);
        } else {
            return res.send(console.log("El producto no se encontro"));
        }

    } catch (err) {
        res.send(err);
    }
});
