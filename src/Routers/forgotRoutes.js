import { Router } from "express";
import { rendersForgot, userForgot } from "../Controllers/forgotRoutesController.js";
//import userModel from "../src/models/userModel.js";
//import { isValidPassword, createHash } from "../utils.js";

const router = Router();

router.get("/", rendersForgot);


router.post("/", userForgot);

export default router;