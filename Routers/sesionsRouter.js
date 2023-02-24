import { Router } from "express";
import userDB from "../src/models/userModel.js";

const sesionsRouter = Router();


const user = new userDB();

sesionsRouter.post('/register', async (req, res)=>{
    const userToBeAdded = req.body;

    let user = await userDB.addUser(userToBeAdded);

    res.redirect("/login");
})

sesionsRouter.post("/login", async (req, res)=>{
    let username = req.body.email;
    let password = req.body.password;

  
    let user = await userDB.findUser(username,password);

  
    if(user.length === 0){
        return res.redirect("/signup");
    }

   
    delete user.password;
    req.session.user = user[0];

    res.redirect('/api/productsDB');
})

sessionsRouter.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if(err) res.send({status:'error', message:'Error al cerrar la sesión: '+err});

        res.redirect('/signup');
    });
})

export default sesionsRouter;