import { Router } from "express";
import { renderSignup } from "../Controllers/signupRouterController.js";



const router = Router();

router.get("/signup", renderSignup);


//router.post("/", signupUser);


export default router;