import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager("./products.json");

app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log("Estoy escuchando");
});

app.get("/products", async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.send(products);
    } catch (err) {
        res.send(err);
    }
});

app.get("/products/:limit", async (req, res) => {
    
    try {
         let products = await productManager.getProducts()
         let shortListProducts = products.filter((prod)=>{
            return prod.id <= req.params.limit;
        }) 
        res.send(shortListProducts);
    } catch (err) {
        res.send(err);
    }
});

app.get("/products/id/:pid", async (req, res) => {
    
    try {
         let products = await productManager.getProducts()
         let idProduct = products.find((prod)=>{
            return prod.id == req.params.pid;
        }) 
        res.send(idProduct);
    } catch (err) {
        res.send(err);
    }
});
