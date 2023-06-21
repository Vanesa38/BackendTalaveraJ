import DATA from "../factory.js";
import productModel from "../models/product.js";
import cartModel from "../models/cart.js";
import userModel from "../models/userModel.js";

const  { CartManager }  = DATA;

const CartsManager = new CartManager();

export const noStockProducts = []



export const cartsProducts = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const user = await userModel.findOne({ cartID: cartId});
      console.log(user)

      if (user){
        const cart = await cartModel.findOne({ cartID: cartId}).lean().populate("products.product");

      if (cart){
        res.status(200).send(cart);
        return cart;
      } else{
        res.status(400).send("El cart no contiene productos");
      }
      } else {
        res.status(400).send("El cart no está asociado a ningún usuario");
      }
      
    } catch (err) {
      res.status(500).send(err.message);
    }
  };


 export const newProducts = async (req, res) => {
    try {
      await CartsManager.create();
      res.status(200).send("Carrito creado");
    } catch (err) {
      req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()}`)
      res.status(500).send(err.message);
    }
  };

  export const addProducts = async (req, res)=>{

        const cartId = req.params.cid;
        console.log(cartId);
        const productId = req.params.pid.trim();
        console.log(productId);
        const { quantity } = req.body;
        const productsExist = await productModel.findById(productId);
        const cartsExist = await cartModel.findOne({ cartID: cartId });
        console.log(cartsExist);

        if (!productsExist) {
          res.status(400).send({ error: "No existe el producto con el id ingresado" });
          return;
        } else if (!cartsExist) {
          res.status(404).send({ error: "No existe usuario con el cart ingresado" });
          return;
        }

         // creador del producto
  if (req.session.user.rol == "Premium" && req.session.user.email == productsExist.owner) {
    res.status(400).send({ status: "error", message: "El usuario no está autorizado" });
    return;
  }

  // carrito asociado al usuario
  if (!cartsExist) {
    res.status(404).send({ error: "No existe un carrito asociado al usuario" });
    return;
  }

  //Stock
  const checkStock = productsExist.stock;
  if (parseInt(quantity) > checkStock) {
    res.status(400).send({ status: "Error", message: "No hay stock suficiente" });
    return;
  }

  try {
    let selectedinCart = cartsExist;
    let productsExistInCart = selectedinCart.products?.find(
      (product) => product.product.toString() === productId
    );
    console.log(productsExistInCart);

    if (productsExistInCart == undefined) {
      if (!selectedinCart.products) {
        selectedinCart.products = [];
      }
      selectedinCart.products.push({ product: productId, quantity: quantity });
    } else {
      let newQuantity = productsExistInCart.quantity + parseInt(quantity);
      let productIndex = selectedinCart.products.findIndex(
        (product) => product.product.toString() === productId
      );
      selectedinCart.products[productIndex].quantity = newQuantity;
    }

    let result = await selectedinCart.save();

    res.status(200).send({ message: "Producto agregado al carrito", selectedinCart, result, cartId, productId });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


  export const deleteProducts = async (req, res) => {
    const cartId = req.params.cid;
    try {
      const response = await cartModel.findOneAndUpdate(
        { cartID: cartId },
        { $set: { products: [] } },
        { new: true }
      )
  
      res.status(200).send({ message: "Carrito eliminado", response });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  export const deleteSelectedProducts = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const deleteProduct = req.params.pid;

      const response = await cartModel.findOneAndUpdate(
        { cartID: cartId },
        { $pull: { products: { product: deleteProduct } } },
        { new: true }
  
      );
      if (response) {
        res.status(200).send({ message: "Producto Eliminado", response });
      } else {
        res.status(404).send({ message: "El producto no se encuentra en el carrito" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  

  export const updateProducts = async (req, res) => {
    const { cartId, updateProduct } = req.body;
    
    try {
      const cart = await cartModel.findOne({ cartID: cartId});
      if (!cart) {
        res.status(404).send({ message: "El carrito no existe" });
        return;
      }

      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === updateProduct.productId
      );
  
      if (productIndex === -1) {
        res.status(404).send({ message: "El producto no existe en el carrito" });
        return;
      }

      cart.products[productIndex].product = updateProduct.newProductId;
      cart.products[productIndex].quantity = updateProduct.quantity;
  
      const response = await cart.save();
  
  
      res.status(200).send({ message: "Carrito actualizado", response });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  export const updateStockProducts = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const { quantity } = req.body;
      const cart = await cartModel.findOne({ cartID: cartId });
      if (!cart) {
        res.status(404).send({ message: "El carrito no existe" });
        return;
      }
      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === productId
      );
  
      if (productIndex === -1) {
        res.status(404).send({ message: "El producto no existe en el carrito" });
        return;
      }
      cart.products[productIndex].quantity = quantity;

    const response = await cart.save();

    res.status(200).send({ message: "Stock actualizado", response });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
  