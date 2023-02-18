import cartModel from "../models/cart.js";
import productModel from "../models/product.js";

const cartsModel = cartModel;
const productsModel = productModel;

class CartsManager {
  getCarts(a) {
    if (a === undefined) {
      return cartsModel.find();
    }
    return cartsModel.find().limit(a);
  }


  getCartById(id) {
    return cartsModel.find({ _id: id });
  }


  addCart(arr) {
    return cartsModel.create(arr);
  }

  
  async updateCartProducts(cid, pid) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const newProd = { product: pid, quantity: 1 };
    const Nproducts = cart[0].products;

    Nproducts.forEach((element, index) => {
      if (pid === element.product._id.toJSON()) {
        ind = index;
      }
    });

    if (!isNaN(ind)) {
      Nproducts[ind].quantity++;
    } else {
      Nproducts.push(newProd);
    }

    const result = cartsModel
      .find({ _id: cid })
      .updateMany({ products: Nproducts });
    return result;
  }

 
  deleteCart(id) {
    return cartsModel.deleteOne({ _id: id });
  }


  async deleteCartProduct(cid, pid) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const Nproducts = cart[0].products;
    Nproducts.forEach((element, index) => {
      if (pid === element.product._id.toJSON()) {
        ind = index;
      }
    });

    if (!isNaN(ind)) {
      Nproducts.splice(ind, 1);
      const result = cartsModel
        .find({ _id: cid })
        .updateMany({ products: Nproducts });
      return result;
    }
  }

 
  updateCart(cid, products) {
    const result = cartsModel
      .find({ _id: cid })
      .updateMany({ products: products });
    return result;
  }

 
  async updateProductQuantity(cid, pid, qty) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const Nproducts = cart[0].products;
    Nproducts.forEach((element, index) => {
      if (pid === element.product._id.toJSON()) {
        ind = index;
      }
    });

    if (!isNaN(ind)) {
      Nproducts[ind].quantity = qty.quantity;
      const result = cartsModel
        .find({ _id: cid })
        .updateMany({ products: Nproducts });
      return result;
    }
  }


  deleteCartProducts(cid) {
    const result = cartsModel.find({ _id: cid }).updateMany({ products: [] });
    return result;
  }
}

class ProductsManager {
  getProducts(a) {
    if (a === undefined) {
      return productsModel.find();
    }
    return productsModel.find().limit(a);
  }


  getProductsPag(category, stock, page, limit, sort, url) {
    let query;
    let prevURL;
    let nextURL;
    console.log(url);
    if (sort === "asc") {
      sort = 1;
    } else if (sort === "desc") {
      sort = -1;
    }

    if (category != undefined || stock != undefined) {
      if (category != undefined) {
        query = { category: category };
      } else {
        query = { stock: stock };
      }
    } else {
      query = {};
    }

    return productsModel.paginate(
      query,
      {
        page: page,
        limit: limit,
        sort: { price: sort },
      },
      (err, res) => {
        res.hasPrevPage
          ? (prevURL = url.replace(`page=${res.page}`, `page=${res.prevPage}`))
          : null;
        res.hasNextPage
          ? (nextURL = url.replace(`page=${res.page}`, `page=${res.nextPage}`))
          : null;
        return {
          status: res.docs.length != 0 ? "success" : "error",
          payload: res.docs,
          totalPages: res.totalPages,
          prevPage: res.prevPage,
          nextPage: res.nextPage,
          page: res.page,
          hasPrevPage: res.hasPrevPage,
          hasNextPage: res.hasNextPage,
          prevLink: prevURL,
          nextLink: nextURL,
        };
      }
    );
  }


  getProductById(id) {
    return productsModel.find({ _id: id });
  }

  
  addProducts(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    const product = {
      title: title,
      description: description,
      code: code,
      price: price,
      status: status,
      stock: stock,
      category: category,
      thumbnail: thumbnail,
    };
    productsModel.create(product);
  }


  updateProduct(id, product) {
    // const result =  await productsModel.findByIdAndUpdate(id,product)
    return productsModel.find({ _id: id }).updateMany(product);
  }


  deleteProduct(id) {
    return productsModel.deleteOne({ _id: id });
  }
}

// Exporting objects.
export default { CartsManager };