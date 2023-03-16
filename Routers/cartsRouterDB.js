import { Router } from "express";
import { CartManager } from "../src/Class/dataBaseManager.js";


const cartsRouter = Router();

const CartsManager = new CartManager();



cartsRouter.get("/", async (req, res) => {
  try {
    const cart = await CartsManager.read();
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



cartsRouter.post("/", async (req, res) => {
  try {
    const response = await CartsManager.create();
    console.log(response);
    res.status(200).send({ message: "Carrito creado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


cartsRouter.post('/:cid/product/:pid', async (req, res)=>{
  try {
      let productId = req.params.pid;
      let cartId = req.params.cid;
  
      await CartsManager.update(cartId, productId);
  
      res.send({status: 'success', message: "Producto cargado con exito al carrito"});
  } catch (error) {
      res.status(404).send({status:'error', message: error.message});
  }
})

cartsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CartsManager.delete(id);

    res.status(200).send({ message: "Carrito eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const id = req.params.cid;
    const pid = req.params.pid;
    const result = await CartsManager.deleteCartProduct(id, pid);
    res
      .status(200)
      .send({ message: "Product deleted", acknowledged: result.acknowledged });
  } catch (err) {
    res.status(500).send("Product not found");
    const error = err.message;
    console.log(error);
  }
});


cartsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const response = await CartsManager.update(id, product);
    res.status(200).send({ message: "Carrito actualizado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const id = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body;
    const result = await CartsManager.update(id, pid, quantity);
    res.status(200).send({
      message: "Product quantity updated",
      acknowledged: result.acknowledged,
    });
  } catch (err) {
    res.status(500).send("Product not found");
    const error = err.message;
    console.log(error);
  }
});


export default cartsRouter;