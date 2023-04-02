import { Router } from "express";
import { rendersLogin, userLogin } from "../Controllers/loginRouterController.js";
import userModel from "../src/models/userModel.js";
import { isValidPassword } from "../utils.js";

const admin = {
    username: "adminCoder@coder.com", 
    password: "adminCod3r123"
}

const router = Router();

router.get("/", rendersLogin);


router.post("/", userLogin);


export default router;