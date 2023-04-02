import fs from 'fs';


export const returnProducts = (req, res) => {
    const products = newProdu.getProducts();
    const {limit} = req.query
    if (limit) return res.json(products.slice(0,limit))
    else return res.json(products)
};

export const adProducts = (req, res) => {
    const {pid} = req.params
    const products = newProdu.getProductsById(Number(pid));

    if (products) return res.status(200).json(products)
    else return res.status(404).json({message:'Product not found'});

};

export const postProducts = (req, res) => {

    const producto = req.body
    const productNew = newProdu.addProducts(producto)

    res.json({producto})

};

export const updateProducts = (req, res) => {
    const productsid = req.params.pid;
   
    const productBody = req.body

    const productUpdated = newProdu.updateProduct(productsid, productBody)

    res.json({productUpdated})
    

};

export const deleteProducts = (req, res) => {
    const productsid = req.params.pid;

    
    newProdu.deleteProduct(req.params.pid)


    res.send("Producto Eliminado")
};

