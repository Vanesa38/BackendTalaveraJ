import passport from "passport";
import local from "passport-local"
import userModel from "../src/models/userModel.js";
import GitHubStrategy from "passport-github2"
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('/signup', new localStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done)=>{
            const{first_name, last_name, email,age} = req.body;
            
            try {
                let user = await userModel.findOne({email:username})
                if (user){
                    console.log("El usuario ya está registrado")
                    return done (null,false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age,
                }
                let result = await userModel.create (newUser);
            }
            catch (error){
                return done ("Error al obtener el usuario" + error)
            }
        }
    )
    )
    
    passport.use('login', new localStrategy({usernameField:'email'}, async (username, password, done)=>{
            try {
                const user = await userModel.findOne(username);
                if(!user){
                    console.log("Usuario no encontrado.");
                    return done(null, false);
                }
                if(!isValidPassword(user, password)) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done("Error en estrategia de login: "+error);
            }
        })
    )



    passport.use('github', new GitHubStrategy( {
        clientID: "Iv1.3eb0e9ed20dcea8d",
        clientSecret:"84dcffe8f79213f2f3e5891c6498b26f30e64253",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    } ,async (accessToken, refreshToken,profile,done) => {
        try {
            console.log(profile)
            let user = await userModel.findOne({email:profile._json.email})
            if (!user){
            let newUser = {
                first_name:profile._json.name,
                last_name:'',
                email:profile._json.email,
                password: '',
                age:31,
            }
            let result = await userModel.create(newUser)
            done(null,result)
        }else {
            done (null,user)
        } 
        }catch (error){
            return done ("Error en estrategia de login: "+error)
        }
    }
    ))
}

passport.serializeUser((user, done)=>{
    done(null, user._id);
})

passport.deserializeUser(async (id, done)=>{
    let user = await userModel.findById(id);
    done(null, user);
})


export default initializePassport