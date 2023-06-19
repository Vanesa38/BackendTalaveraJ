import { Router } from "express";
import { createMockProducts } from "../Controllers/mockRouterController.js";


const Mockrouter = Router();

Mockrouter.get("/", createMockProducts);





export default Mockrouter;