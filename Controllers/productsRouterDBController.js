import  productModel  from "../src/models/product.js"
//import { ProductManager } from "../src/Class/dataBaseManager.js"
import DATA from "../src/factory.js";

console.log("esto trae data", DATA);
const { ProductManager } = DATA;
console.log(DATA);

const productManager = new ProductManager();

export const routeProducts = async (req, res) => {
    const stock = req.query.stock;
    const page = req.query.page;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || 1;
    let query;
    let prevURL;
    let nextURL;
  
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
    const category = req.query.category;
    if (category != undefined || stock != undefined) {
      if (category != undefined) {
        query = { category: category };
      } else {
        query = { stock: stock };
      }
    } else {
      if (category != undefined && stock != undefined) {
        query = { category: category, stock: stock };
      } else {
        query = {};
      }
    }
    try {
      const respuesta = await productModel.paginate(
        query,
        {
          page: page || 1,
          limit: limit,
          sort: { price: sort },
        },
        (err, res) => {
          res.hasPrevPage
            ? (prevURL = url.replace(`page=${res.page}`, `page=${res.prevPage}`))
            : null;
          res.hasNextPage
            ? (nextURL =
                page == undefined
                  ? url.concat(`&page=${res.nextPage}`)
                  : url.replace(`page=${res.page}`, `page=${res.nextPage}`))
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
      res.render("product", {product:respuesta})
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };

  export const postProducts = async (req, res) => {
    const {
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    } = req.body;
  
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !thumbnail ||
      !stock ||
      !category ||
      !status
    ) {
      res.status(400).send({ error: "Faltan datos" });
      return;
    }
  
    try {
      const response = await productManager.create({
        title,
        description,
        code,
        price,
        thumbnail,
        stock,
        category,
        status,
      });
      res.status(200).send({ message: "Producto creado", response });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };


  export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await productManager.delete(id);
  
      res.status(200).send({ message: "Producto eliminado", result });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  export const updateputProducts = async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    } = req.body;
    console.log(req.body);
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !thumbnail ||
      !stock ||
      !category
    ) {
      res.status(400).send({ error: "Faltan datos" });
      return;
    }
    try {
      const result = await productManager.update(id, {
        title,
        description,
        code,
        price,
        thumbnail,
        stock,
        category,
        status,
      });
      res.status(200).send({ message: "Producto actualizado", result });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };