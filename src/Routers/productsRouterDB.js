import { Router } from "express";
import  productModel  from "../models/product.js"
import { ProductManager } from "../memory/dataBaseManager.js"
import { SpecificProduct, deleteProducts, postProducts, routeProducts, updateputProducts } from "../Controllers/productsRouterDBController.js";
import { authMiddleware } from "../../auth.js";

const router = Router();

const productManager = new ProductManager();


router.get("/", routeProducts);

router.get("/api", routeProducts )

router.post("/",authMiddleware, postProducts);



router.delete("/:id",authMiddleware, deleteProducts);



router.put("/:id",authMiddleware, updateputProducts);


router.get("/:pid" , SpecificProduct )


export default router;