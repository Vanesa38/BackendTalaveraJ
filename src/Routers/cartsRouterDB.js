import { Router } from "express";
import DATA from "../factory.js";
import { addProducts, cartsProducts, deleteProducts, deleteSelectedProducts, newProducts, updateProducts, updateStockProducts } from "../Controllers/cartsRouterDBController.js";
import {authMiddleware} from "../../auth.js";

//import { CartManager } from "../Class/dataBaseManager.js";


const cartsRouter = Router();

const { CartManager } = DATA;

const CartsManager = new CartManager();


//lee los productos que hay en carrito
cartsRouter.get("/:cid", authMiddleware, cartsProducts);


//crea un nuevo carrito
cartsRouter.post("/", authMiddleware, newProducts);

//agrega producto a carrito (metodo post)
cartsRouter.post('/:cid/products/:pid', authMiddleware, addProducts);

//borra el carrito completo
cartsRouter.delete("/:cid", authMiddleware, deleteProducts);

//borra el producto seleccionado del carrito
cartsRouter.delete("/:cid/products/:pid", authMiddleware, deleteSelectedProducts);

//actualiza productos dentro de carrito
cartsRouter.put("/:cid", authMiddleware, updateProducts);

//actualiza stock de productos dentro de carrito
cartsRouter.put("/:cid/products/:pid", authMiddleware, updateStockProducts);


export default cartsRouter;