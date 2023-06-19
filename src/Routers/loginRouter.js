import { Router } from "express";
import { rendersLogin} from "../Controllers/loginRouterController.js";
import {loginUser} from "../Controllers/sesionsRouterController.js"

const admin = {
    username: "adminCoder@coder.com", 
    password: "adminCod3r123"
}

const router = Router();

router.get("/login", rendersLogin);


//router.post("/", loginUser);


export default router;