import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
const app = express()
const express = require ('express')

//const ProductManager = require ('../desafio3')
//const productManager = new ProductManager('./database/Productos.JSON')
const PORT = 8080

const socketServer=new Server(httpServer);
app.listen(PORT, () => {
    console.log (`Server running on port ${PORT}`)
    })

const httpServer = app.listen(PORT, () => {

    console.log (`Server running on port ${PORT}`)
        
    })    

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);


//app.get ('/products', async (req,res)=>{
//const products = await productManager.getProducts();
//const {limit} = req.query
//if (limit) return res.json(products.slice(0,limit))
//else return res.json(products)
//})

//app.get ('/products/:pid', async (req,res)=>{
    //const products = await productManager.getProducts();
    //const {pid} = req.params
    //const product = products.find (products => products.id === parseInt(pid))

    //if (product) return res.status(200).json(product)
    //else return res.status(404).json({message:'Producto no encontrado'});
//})

//app.listen(PORT, () => {
//console.log (`Servidor activo en el puerto ${PORT}`)
//})

