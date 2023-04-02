import express from 'express';
const routerProducts = express.Router();
//const {newProdu} = require('../desafio2')
import fs from 'fs';
import { adProducts, deleteProducts, postProducts, returnProducts, updateProducts } from '../Controllers/productsRouterController';



routerProducts.get("/", returnProducts);



routerProducts.get("/:pid", adProducts);



routerProducts.post("/", postProducts);


routerProducts.put("/:pid", updateProducts);


routerProducts.delete("/:pid", deleteProducts);


export default routerProducts