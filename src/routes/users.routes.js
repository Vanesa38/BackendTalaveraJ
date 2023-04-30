import { Router } from "express";
import { usuarios } from "../models/userModel.js"

const router = Router();

router.get("/usuarios", async (req, res) => {
    const users = await usuarios.find();
    res.send(users);
  });
  
  router.get("/usuarios/:id", async (req, res) => {
    const user = await usuarios.findById(req.params.id);
    res.send(user);
  });
  
  router.post("/usuarios", async (req, res) => {
    const user = new usuarios(req.body);
    await user.save();
    res.send(user);
  });
  
  router.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, password } = req.body;
  
    const result = await userModel.findByIdAndUpdate(id, {
      name,
      lastname,
      email,
      password,
    });
  
    res.send(result);
  });
  
  router.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
  
    const result = await userModel.findByIdAndDelete(id);
  
    res.send(result);
  });
  
  export default router;