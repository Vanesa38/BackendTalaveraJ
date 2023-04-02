import { Router } from "express";
import userDB from "../src/models/userModel.js";
import passport from "passport";



const sesionsRouter = Router();

const user = new userDB();

export const userSesions = passport.authenticate('signup', {failureRedirect:'/failregister'}) 
async (req, res)=>{
    const userToBeAdded = req.body;
    let user = await userDB.addUser(userToBeAdded);
    res.redirect("/login");
};

export const failRegister = async (req, res)=>{ 
    console.log('Ha habido un error. Por favor intente nuevamente')
    res.send({errro:'Falla al Registrarse'})
};

export const loginUser = passport.authenticate('login', {failureRedirect: 'faillogin'}) 
async (req, res)=>{

    if(user.length === 0){
    return res.redirect("/signup");
}

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    
    res.redirect('/product');

  
    
   
    delete user.password;
    req.session.user = user[0];

    res.redirect('/product');
};

export const githubLogin = (passport.authenticate('github', {scope:['user:email']}), (req, res)=>{});

export const githubCall = (passport.authenticate('github', {failureRedirect:'/login'}), (req, res)=>{

    req.session.user = req.user;

    res.redirect('/product');
});

export const Logout = (req, res)=>{
    req.session.destroy(err=>{
        if(err) res.send({status:'error', message:'Error al cerrar la sesión: '+err});

        res.redirect('/signup');
    });
};






