import  productModel  from "../models/product.js"
//import { ProductManager } from "../Class/dataBaseManager.js"
import DATA from "../factory.js";
import CustomMistake from "../../mistakes/customMistake.js";
import Errores from "../../mistakes/enumsError.js";
import { ProductsMistakeInfo } from "../../mistakes/mistakeMiddleware.js"

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
    const isApi =  ()=> {

    return url.includes("api")
    }
  
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
      const respuesta = await productModel.paginate({}, {lean:true})
      let response = respuesta.docs
        query,
        {
          page: page || 1,
          limit: limit,
          sort: { price: sort },
        },{lean:true},
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
        },
     isApi()? 
     res.send( { product: response }):

     res.render("product", { product: response })
    } catch (err) {
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
      
      CustomMistake.createError({
        name: "Error al agregar producto",
        cause: ProductsMistakeInfo({
          title,
          description,
          code,
          price,
          thumbnail,
          stock,
          category,
          status,
        }),
        message:"Error al intentar agregar un nuevo producto a la DB",
        code: Errores.TIPO_INVALIDO
    })
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

  export const SpecificProduct = async (req, res) => {
    const { id } = req.params.pid;
    console.log(id)
    try {
      const response = await productManager.findById(id);
  
      res.render(200).send({ message: "Detalles de su Producto", response });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  export const updateputProducts = async (req, res) => {
    const { id } = req.params;
    console.log(id)
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