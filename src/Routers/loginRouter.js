import { Router } from "express";
import { rendersLogin, userLogin} from "../Controllers/loginRouterController.js";


const admin = {
    username: "adminCoder@coder.com", 
    password: "adminCod3r123"
}

const router = Router();

router.get("/login", rendersLogin);

router.get(" ", rendersLogin);


router.post("/", userLogin);


export default router;