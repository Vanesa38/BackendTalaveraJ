import express from 'express';
const routerCarts = express.Router();
import fs from 'fs';

const cartsDb = JSON.parse(fs.readFileSync('./database/cart.JSON', 'utf-8'))


routerCarts.post("/", (req, res) => {

    let cart = {
      id: cartsDb.length == 0 ? 1 : cartsDb.length + 1,
      products: []
    }

    cartsDb.push(cart)
    fs.writeFileSync('/database/cart.JSON', JSON.stringify(cartsDb))
    res.send("Carrito creado");
});


routerCarts.get("/:cid", (req, res) => {
    const carritoId = req.params.cid;

    const searchInCart = cartsDb.find(product => product.id === Number(req.params.cid)) 

    if (searchInCart == undefined) {
      console.log( "Product not found")
    }
    else {

      res.send(searchInCart)  
    }
});


routerCarts.post("/:cid/product/:pid", (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
 

    const productPost = 
    {
        'id': productoId,
        'quantity': 1
    }

    const verifiedCode = cartsDb.find(p => p.id === +carritoId)

    
    const verified1 = verifiedCode.products.find(product=>product.id===productPost.id)

   
    
    const verified2 = verifiedCode.products.find(product=>product.id === productoId)


    if(verified1){
      verified2.quantity++
    }else{
      verifiedCode.products.push(productPost);
    }



    fs.writeFileSync ('cart.JSON', JSON.stringify(cartsDb))

    
    res.send("Producto Agregado")
    

});


export default routerCarts