export const  authMiddleware = async (req,res,next)=>{
    if(req.session?.user != undefined){
    return next()
    }
    return res.status(401).redirect("/login")
}

//Si no es "admin", puede acceder 
export const checkUserRol = async (req, res, next) => {
    if (req.session?.user?.rol === 'Usuario') {
        return next();
    }
    return res
    .status(401)
    .redirect("/login?message=Debe loguearse como Usuario para acceder a esta seccion");
};



//Middleware userPremium 

export const checkUserPremium = async (req, res, next) => {
    if (req.session?.user?.rol === 'Premium') {
        return next();
    }
    return res
    .status(401)
    // otra vista para rechazar usuarios que no sean premium

    .redirect("/product");
};

//Middleware de Administrador

export const authAdminMiddleware = async (req, res, next) => {
    if (req.session?.user?.role === "Admin") {
        return next();
    }
    return res.status(401).redirect("/login?message=Debe ser administrador para acceder a esta sección");
};


