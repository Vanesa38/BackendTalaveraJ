import express from 'express';
//import fs from 'fs';
import { adProducts, deleteProducts, postProducts, returnProducts, updateProducts } from '../Controllers/productsRouterController';

const routerProducts = express.Router();

routerProducts.get("/", returnProducts);



routerProducts.get("/:pid", adProducts);



routerProducts.post("/", postProducts);


routerProducts.put("/:pid", updateProducts);


routerProducts.delete("/:pid", deleteProducts);


export default routerProducts