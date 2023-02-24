import { Router } from "express";
import userModel from "../src/models/userModel.js";

let admin = "adminCoder@coder.com, "

const router = Router();

router.get("/", async (req, res) => {
    res.render("login", { style: "css/login.css" });
});

router.post("/", async (req, res) => {
    const {username, password}=req.body;
    try{
        const response = await userModel.findOne({email:username, password:password});
        if(response == admin) {
        res.status(200).json({message:"logged in", data:response})
        console.alert("Bienvenido Administrador")
        userModel.rol = "Administrador"
    } else if (response){
        res.status(200).json({message:"logged in", data:response})
        console.alert("Bienvenido",{username})
    }else {
        res.status(400).json({message:"error", data:"Usuario no encontrado"})
    }
    }catch (error){
        res.status(500).json({error:error.message})
    }
});

export default router;