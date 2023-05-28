import __dirname from "../utils.js";
import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import fs from "fs";
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import { engine } from "express-handlebars";
import productsRouterDB from "./Routers/productsRouterDB.js";
import cartsRouterDB from "./Routers/cartsRouterDB.js";
import viewsRouter from "./Routers/viewsRouter.js";
import loginRouter from "./Routers/loginRouter.js"
import signupRouter from "./Routers/signupRouter.js"
import sesionsRouter from "./Routers/sesionsRouter.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from '../config/passportConfig.js';
import { failRegister } from './Controllers/sesionsRouterController.js';
import forgotRoutes from "./Routers/forgotRoutes.js"
import cookieParser from 'cookie-parser';
import currentUser from "./Routers/sesionsRouter.js"
import errorHandler from "../mistakes/errorsInfo.js";
import loggerTestingRoute from "./Routers/loggerTest.js"
import Mockrouter from "./Routers/mockingRouter.js"
import { Faker } from '@faker-js/faker';
import nodemailer from "nodemailer"
import { renderReset, resetPassword } from './Controllers/forgotRoutesController.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress  from "swagger-ui-express";
import adminRouter from "./Routers/adminRouter.js"

dotenv.config();

const app = express()
const PORT = 8080;
const swaggerOptions = {
  definition: {
    openapi:'3.0.1',
    info: {
      title: "Documentacion de un Ecommerce",
      description: "API que documenta la funcion endpoints del proyecto" 
    }
  },
  apis:[`${__dirname}/src/docs/**/*.yaml`],
}

const specs = swaggerJSDoc(swaggerOptions)

//Mongo
const USER_MONGO = process.env.USER_MONGO;
const PASS_MONGO = process.env.PASS_MONGO;
const DB_MONGO = process.env.DB_MONGO;



const httpServer = app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})


const socketServer=new Server(httpServer);
const readJson = async () =>{
    const data = await fs.readFileSync("./database/Productos.Json", "utf-8");
    const products = await JSON.parse(data);
    return products;
};

const writeJson = async (data) => {
const dataToWrite = await JSON.stringify(data, null, "\t");
await fs.writeFileSync("./database/Productos.JSON", dataToWrite);

};

socketServer.on('connection', (socket) =>{
    console.log ('nuevo user recibido');
socket.on("message", async (data) => { 

    let products = await readJson()
    products.push({title: data})
    await writeJson(products)
    socketServer.emit("paragraph" ,products);
});  

});

//Express
app.engine("handlebars",handlebars.engine());
app.set("views",__dirname+"/public/views");
app.set("view engine","handlebars");
app.set("/public/views");
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/apidocs', swaggerUiExpress.serve,swaggerUiExpress.setup(specs) )

app.get("/faker", async (req, res) => {
  const user = {
    name: Faker.name.firstName(),
    lastname: Faker.name.lastName(),
    email: Faker.internet.email(),
    password: Faker.internet.password(),
  };

  res.send(user);
});


app.use(session({
  store: MongoStore.create({
      mongoUrl:`mongodb+srv://${USER_MONGO}:${PASS_MONGO}@cluster0.mrgyyvo.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`,
      mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
      ttl:15
  }),
  secret:'BackendTalavera',
  resave:true,
  saveUninitialized:true
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


//Rutas
app.use("/api/carts", cartsRouterDB);
app.use("/product", productsRouterDB);
app.use("/", viewsRouter);
app.use("/login", loginRouter );
app.use("/signup", signupRouter);
app.use('/api/sesions/', sesionsRouter);
app.use('/logout', sesionsRouter);
app.use('/reset', renderReset)
app.use("/reset/:token", resetPassword)
app.use('/forgot', forgotRoutes);
app.use("/failregister", failRegister)
app.use("/current" , currentUser)
app.use(errorHandler)
app.use("/loggerTest", loggerTestingRoute)
app.use("/mockingProduct", Mockrouter)
app.use("/", adminRouter)



//inicializar envio de mail

const transporter = nodemailer.createTransport({
  service: "gmail",
  port:587,
  auth:{
    user:"vanetala32@gmail.com",
    pass:"qfvjuramvzzdmywm"
  }

})

app.get('/mail', async (req, res) =>{
    let result = await transporter.sendMail({
    from:'CoderHouse 37570 <coderhouse37570@gmail.com',
    to:'vanetala32@gmail.com',
    subject:'Prueba de Envio de Correo',
    text:'Este es un mail de prueba',
    html: '<h1>Esto es una prueba de envio de email</h1>'

  })
  res.send('Correo Enviado')
})




//app.get ('/products', async (req,res)=>{
//const products = await productManager.getProducts();
//const {limit} = req.query
//if (limit) return res.json(products.slice(0,limit))
//else return res.json(products)
//})

//app.get ('/products/:pid', async (req,res)=>{
    //const products = await productManager.getProducts();
    //const {pid} = req.params
    //const product = products.find (products => products.id === parseInt(pid))

    //if (product) return res.status(200).json(product)
    //else return res.status(404).json({message:'Producto no encontrado'});
//})

//app.listen(PORT, () => {
//console.log (`Servidor activo en el puerto ${PORT}`)
//})

const environment = async () => {
    try {
      await mongoose.connect (
        `mongodb+srv://${USER_MONGO}:${PASS_MONGO}@cluster0.mrgyyvo.mongodb.net/${DB_MONGO}?retryWrites=true&w=majority`,
  
      );
      console.log(`Conectado a la base de datos`);
    } catch (error) {
      console.log(`Error al conectar a a la base de datos: ${error}`);
    }
  };
  
  
  const isValidStartDB = () => {
    if (USER_MONGO&& PASS_MONGO) return true;
    else return false;
  };

  //Middleware para datos de sesion
  app.use((req, res, next)=>{     
    res.locals.session = req.session;
    next();
  })
  
  
  
  console.log("isValidStartDB", isValidStartDB());
  isValidStartDB() && environment();
