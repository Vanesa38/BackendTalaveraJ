import express from 'express';
const routerCarts = express.Router();
import fs from 'fs';
import { productsAdd, productsLogic, productsSearch } from '../Controllers/cartsRouterController';
import authMiddleware from '../auth';

const cartsDb = JSON.parse(fs.readFileSync('./database/cart.JSON', 'utf-8'))


routerCarts.post("/", authMiddleware, productsLogic);


routerCarts.get("/:cid", authMiddleware, productsSearch);



routerCarts.post("/:cid/product/:pid", authMiddleware, productsAdd);


export default routerCarts
