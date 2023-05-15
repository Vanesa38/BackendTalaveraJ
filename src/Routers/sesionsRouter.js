import { Router } from "express";
import userDB from "../models/userModel.js";
import passport from "passport";
import { failRegister, githubCall, githubLogin, renderUser, loginUser, Logout, userSesions } from "../Controllers/sesionsRouterController.js";

const sesionsRouter = Router();


const user = new userDB();



sesionsRouter.post('/signup', userSesions);


sesionsRouter.get('/failregister', failRegister);


//login de usuarios

sesionsRouter.post('/login', loginUser);

sesionsRouter.get("/", renderUser)



//Login con Github
sesionsRouter.get('/github', githubLogin);


sesionsRouter.get('/githubcallback', githubCall);


sesionsRouter.get('/logout', Logout);


export default sesionsRouter;