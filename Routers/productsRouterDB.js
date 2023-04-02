import { Router } from "express";
import  productModel  from "../src/models/product.js"
import { ProductManager } from "../src/Class/dataBaseManager.js"
import { deleteProducts, postProducts, routeProducts, updateputProducts } from "../Controllers/productsRouterDBController.js";

const router = Router();

const productManager = new ProductManager();

router.get("/", routeProducts);



router.post("/", postProducts);


router.delete("/:id", deleteProducts);


router.put("/:id", updateputProducts);

export default router;