import { Router } from "express";
import { addProducts, cartsProducts, deleteProducts, deleteSelectedProducts, newProducts, updateProducts, updateStockProducts } from "../Controllers/cartsRouterDBController.js";
import { CartManager } from "../src/Class/dataBaseManager.js";



const cartsRouter = Router();

const CartsManager = new CartManager();


//lee los productos que hay en carrito
cartsRouter.get("/", cartsProducts);


//crea un nuevo carrito
cartsRouter.post("/", newProducts);

//agrega producto a carrito (metodo post)
cartsRouter.post('/:cid/product/:pid', addProducts);

//borra el carrito completo
cartsRouter.delete("/:id", deleteProducts);

//borra el producto seleccionado del carrito
cartsRouter.delete("/:cid/products/:pid", deleteSelectedProducts);

//actualiza productos dentro de carrito
cartsRouter.put("/:id", updateProducts);

//actualiza stock de productos dentro de carrito
cartsRouter.put("/:cid/products/:pid", updateStockProducts);


export default cartsRouter;