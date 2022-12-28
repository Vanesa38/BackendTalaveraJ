const express = require ('express')
const app = express()
const ProductManager = require ('../desafio3')
const productManager = new ProductManager('./database/Productos.JSON')
const PORT = 8080


app.get ('/products', async (req,res)=>{
const products = await productManager.getProducts();
const {limit} = req.query
if (limit) return res.json(products.slice(0,limit))
else return res.json(products)
})

app.get ('/products/:pid', async (req,res)=>{
    const products = await productManager.getProducts();
    const {pid} = req.params
    const product = products.find (products => products.id === parseInt(pid))

    if (product) return res.status(200).json(product)
    else return res.status(404).json({message:'Producto no encontrado'});
})

app.listen(PORT, () => {
console.log (`Servidor activo en el puerto ${PORT}`)
})

