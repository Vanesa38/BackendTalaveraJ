const products = []


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

    addProducts() {
     
        const product = ({

            title: this.title,
            description: this.description,
            price: this.price,
            thumnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
            id:ProductManager.id
        
        })
    
    
    const verifiedCode = products.find(element => element.code === product.code)
    
    if(verifiedCode == true) {
        console.log("Error")
    }
    else {
        products.push(product)
        ProductManager.id++ 
    }
    if (!product.title || !product.description || !product.price ||

        !product.thumbnail || !product.code || !product.stock) {

      throw new Error('Todos los campos son obligatorios');

    }
      

} 
} 

const inCart = (id) => { return products.find (product =>product.title === title)}
    

    const getProducts = () => {
      console.log(products)
    }
    const getProductById = (id) => {

        const search = products.find(product => product.id === id)
        if (search == undefined) {
            console.log( "No se encuentran productos con ese codigo")
      
    }
    else {
        console.log(search)
      }
    }

    const inProducts = (title) => {
        products.find (prod => prod.title === title)
    }


    const MacBookPro13 = new ProductManager("MacBookPro", "potente", "500", "img", "10", "15")

    const MacBookPro14 = new ProductManager("MacBookPro", "veloz", "600", "img", "17", "20")


    MacBookPro13.addProduct()

    MacBookPro14.addProduct()

    getProducts()

    