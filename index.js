const productos = []


class ProductManager {
    
    static id =  1

    constructor(title, description, price, thumbnail, code, stock) {

      this.title = title
      this.description = description
      this.price = price
      this.thumbnail = thumbnail
      this.code = code
      this.stock = stock

      ProductManager.id
    }

    addProduct() {
     
        let producto = ({

            title: this.title,
            description: this.description,
            price: this.price,
            thumnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
            id:ProductManager.id
        
        })
    
    
    const verifiedCode = productos.find(element => element.code === producto.code)
    
    if(verifiedCode) {
        console.log("Error")
    }
    else {
        productos.push(producto)
        ProductManager.id++ 
    }

} 
} 
    

    const getProducts = () => {
      console.log(productos)
    }
    const getProductById = (id) => {

        const search = productos.find(producto => producto.id === id)
        if (search == undefined) {
            console.log( "No se encuentran productos con ese codigo")
      
    }
    else {
        console.log(search)
      }
    }


    const MacBookPro13 = new ProductManager("MacBookPro", "potente", "500", "img", "10", "15")

    const MacBookPro14 = new ProductManager("MacBookPro", "veloz", "600", "img", "17", "20")


    MacBookPro13.addProduct()

    MacBookPro14.addProduct()

    getProducts()

    getProductById()