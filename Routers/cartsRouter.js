import express from 'express';
const routerCarts = express.Router();
import fs from 'fs';
import { productsAdd, productsLogic, productsSearch } from '../Controllers/cartsRouterController';

const cartsDb = JSON.parse(fs.readFileSync('./database/cart.JSON', 'utf-8'))


routerCarts.post("/", productsLogic);


routerCarts.get("/:cid", productsSearch);



routerCarts.post("/:cid/product/:pid", productsAdd);


export default routerCarts