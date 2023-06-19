import express from 'express';
const viewsRouter = express.Router();
import fs from 'fs';
import { getProducts, realTimeProducts } from '../Controllers/viewsRouterController.js';
import {authMiddleware} from '../../auth.js';
import { failRegister } from '../Controllers/sesionsRouterController.js';

const readFile= async () => {

    const data = await fs.readFileSync("./database/Productos.JSON", "utf-8");
    
    const products = await JSON.parse(data);
    
    return products;
    
    };

/*viewsRouter.get ("/", async (req, res) => { 
    const products = await readFile(); 
    res.render("home", {products} );
});*/

viewsRouter.get('/realtimeproducts', authMiddleware, realTimeProducts);

viewsRouter.get('/', authMiddleware, getProducts);

viewsRouter.get('/failregister', failRegister)


    //let products = fs.writeFileSync()

    //req.io.on('connection', socket=>{
        //console.log("Cliente conectado.");
   // })


export default viewsRouter;