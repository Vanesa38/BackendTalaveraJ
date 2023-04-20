import { Router } from "express";
import { createMockProducts } from "../Controllers/mockRouteController";


const Mockrouter = Router();

Mockrouter.get("/mockingproducts", createMockProducts);





export default Mockrouter;