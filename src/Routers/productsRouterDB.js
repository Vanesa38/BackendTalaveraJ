import { Router } from "express";
import  productModel  from "../models/product.js"
import { ProductManager } from "../memory/dataBaseManager.js"
import { deleteProducts, postProducts, routeProducts, updateputProducts } from "../Controllers/productsRouterDBController.js";
import authMiddleware from "../../auth.js";

const router = Router();

const productManager = new ProductManager();

router.get("/", authMiddleware, routeProducts);



router.post("/", authMiddleware, postProducts);


router.delete("/:id", authMiddleware, deleteProducts);


router.put("/:id", authMiddleware, updateputProducts);

export default router;