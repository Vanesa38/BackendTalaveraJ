//Verificar el rol del usuario
const checkRole = async (req, res, next, role) => {
  //Obtener el rol del usuario desde una base de datos o algún otro servicio de autenticación
  const userRole = 'admin'; 

  if (userRole === role) {
    
  next();
  } else {
    // El usuario no tiene el rol requerido, devolver respuesta de error
  res.status(403).send('No tienes permisos para acceder a este endpoint');
  }
}

//limitar acceso de acuerdo al rol del usuario
const restrictToRole = (role) => {
  return (req, res, next) => {
  checkRole(req, res, next, role);
  }
}

//Middleware restrictToRole para limitar acceso a un endpoint
app.get('/admin', restrictToRole('admin'), (req, res) => {
  
});