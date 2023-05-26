import { Router } from "express";
import userModel from "../models/userModel.js";
import { isValidPassword } from "../../utils.js";

const router = Router();

const admin = {
    username: "adminCoder@coder.com", 
    password: "adminCod3r123"
}

export const rendersLogin = async (req, res) => {
    res.render("login");
};

export const userLogin = async (req, res) => {
    const {username, password}=req.body;
    try{
        const response = await userModel.findOne({email:username});

        if(response && isValidPassword(password, response.password)) {
        req.session.user = response;
        res.status(200).json({message:"success", data:response})
    
    } else {
        res.status(400).json({message:"error", data:"Usuario no encontrado"})
    }
    
    }catch (error){
        //req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()}`)
        res.status(500).json({error:error.message})
    }
};

export default router; 


