import { Router } from "express";
import userModel from "../models/userModel.js";
import { createHash } from "../../utils.js";
import passport from "passport";

const router = Router();

export const renderSignup = async (req, res) => {
    res.render("signup", { style: "css/signup.css" });
};


export const signupUser =  async (req, res) => {
    const {first_name, last_name, email, password, age}=req.body;
    try{
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
    })
    await newUser.save()
    res.status(201).json({message:"Usuario creado", data:newUser})
}catch (error) {
    req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()}`)
res.status(500).json({error:error.message})
}
};