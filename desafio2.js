const fs = require (`fs`)

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = this.readFile();
    }
  
    readFile() {

        try {
        
        const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
        
        return data;
        
        } catch (error) {
        
        return []
        
        }
        
        }
  
    writeData(data) {
      let dataString = JSON.stringify(data);
      fs.writeFileSync(`./${this.path}`, dataString);
    }


    addProducts(product) {     
        
      
        let listado = this.readFile();
        const inCart = listado.find(p => p.code === product.code)

        if (!product.title || !product.description || !product.price ||
            
            !product.thumbnail || !product.code || !product.stock) {
                
                throw new Error('Todos los campos son obligatorios'); 
            } else if (inCart){
                console.log("ERROR")
            }
        else {
            
            
            product.id = listado.length > 0 ? listado[listado.length - 1].id + 1 : 1;
            listado.push(product)
            this.writeData(listado)
                             
        }
    }
            
         
        
    getProducts () {
        try {
        
            const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
            
            return data;
            
            } catch (error) {
            
            return []
            
            }
            
            }




    getProductsById (id){
   
    let listaProductos = this.readFile();
    const products = listaProductos
   

    const search = products.find(product => product.id === id) 

    if (search == undefined) {
  console.log( "Product not found")
}
else {
   
  return search 
}
}

inProducts  (title)  {
    products.find (prod => prod.title === title)
}




updateProduct(id, product){
  
    let data = this.readFile ();
    if(data.find(product=>product.id===id)){
        let productDeleted = data.filter(product => product.id!==id)
        product.id=id;
        productDeleted.push(product);
        this.writeData(productDeleted);
        return productDeleted;

    }
    else{
        console.log('El producto no existe')
    }
}


    async deleteProduct (id){
    let productosm = await  this.readFile() 
    try {
       productosm = productosm.filter (producto =>producto.id != id )
    this.writeData(productosm)
        
    } catch (err) {
        console.log("Hubo un error!")
    }
}

deleteAll(){
    this.writeFile([])
}
}

const newProdu = new ProductManager('productos.JSON');

newProdu.updateProduct(1,{
        title: "MacBookPro13",
        description: "Potente y Veloz",
        price: 500,
        thumbnail: "img",
        code: 10,
        stock: 15,
})

newProdu.updateProduct(2,{
       title: "MacBookPro14",
       description: "Gran almacenamiento y velocidad",
       price: 600,
       thumbnail: "img",
       code: 17,
       stock: 20,
}) 

newProdu.updateProduct(3,{
    title: "Iphone 13 Pro Max",
    description: "Gran capacidad de almacenamiento y velocidad",
    price: 550,
    thumbnail: "img",
    code: 18,
    stock:35
}

)


