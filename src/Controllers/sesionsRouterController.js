import { Router } from "express";
import userDB from "../models/userModel.js";
import passport from "passport";
import userModel from "../models/userModel.js";


const sesionsRouter = Router();

const user = new userDB();

export const userSesions = async (req, res, next) => {
    passport.authenticate('signup', { failureRedirect: '/failregister' }, async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ message: 'Failed to create user' });
        }
        req.logIn(user, (err) => {
            if (err) {
            return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Usuario Creado', data: user });
        });
        })(req, res, next);
    };
    

export const failRegister = async (req, res)=>{ 
    console.log('Ha habido un error. Por favor intente nuevamente')
    res.send('failRegister')
};

export const loginUser = async (req, res) => {
    passport.authenticate("login", { failureRedirect: "/faillogin" }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(400).json({ message: "Failed to login" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        // Se borra la password.
        delete user.password;
        req.session.user = user;
        res.status(200).json({ message: "Login successful", data: user });
      });
    })(req, res);
  };


export const renderUser =  async (req,res)=>{
    if (await req.session?.user){
        const userData = await userModel.findOne({
            email: req.session.user.email
        });
        res.render("user")

    }
        
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

