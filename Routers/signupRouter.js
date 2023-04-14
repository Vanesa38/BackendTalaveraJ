import { Router } from "express";
import { renderSignup, signupUser } from "../Controllers/signupRouterController.js";
import userModel from "../src/models/userModel.js";
import { createHash } from "../utils.js";


const router = Router();

router.get("/", renderSignup);


router.post("/", signupUser);


export default router;