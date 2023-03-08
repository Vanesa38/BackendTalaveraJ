import express from 'express';
const viewsRouter = express.Router();
import fs from 'fs';

const readFile= async () => {

    const data = await fs.readFileSync("./database/Productos.JSON", "utf-8");
    
    const products = await JSON.parse(data);
    
    return products;
    
    };

/*viewsRouter.get ("/", async (req, res) => { 
    const products = await readFile(); 
    res.render("home", {products} );
});*/

viewsRouter.get("/realtimeproducts", async (req, res)=>{
    res.render("realTimeProducts", {});
})

viewsRouter.get('/', async (req, res)=>{

    res.render('login', {});
})



    //let products = fs.writeFileSync()

    //req.io.on('connection', socket=>{
        //console.log("Cliente conectado.");
   // })


export default viewsRouter;