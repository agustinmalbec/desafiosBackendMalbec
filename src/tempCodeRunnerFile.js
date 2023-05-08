console.log(await pm.getProducts());
        console.log(await pm.getProductById(3));
        console.log(await pm.deleteProduct(1));
        console.log(await pm.getProducts());
        console.log(await pm.updateProduct(2, 999));
        console.log(await pm.getProducts());