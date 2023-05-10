import { Router } from "express";
import ProductManager from "../ProductManager";

const productManager = new ProductManager("./products.json");

const products = [];
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
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
        res.status(400).send({ err });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        let { product } = req.body;
        productManager.addProduct(product);
        res.status(201).send({ agregado: product });
    } catch (err) {
        res.status(400).send({ err });
    }
});

productsRouter.get("/:pid", async (req, res) => {

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
        res.status(400).send({ err });
    }
});

productsRouter.put("/:pid", (req, res) => {

});

productsRouter.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        productManager.deleteProduct(id);
        res.send();
    } catch (err) {
        res.status(400).send({ err });
    }
});

export { productsRouter };