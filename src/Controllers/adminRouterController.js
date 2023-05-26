import userModel from "../models/userModel";

export const paginatedUsers = async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || 1;
    let query;
    let prevURL;
    let nextURL;
  
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  
    try {
      const listUsers = await userModel.paginate({}, {
        page: page || 1,
        limit: limit,
        sort: { first_name: sort },
        lean: true
      });
  
      query = {};
  
      const response = listUsers.docs;
      const totalPages = listUsers.totalPages;
      const prevPage = listUsers.prevPage;
      const nextPage = listUsers.nextPage;
      const currentPage = listUsers.page;
      const hasPrevPage = listUsers.hasPrevPage;
      const hasNextPage = listUsers.hasNextPage;
  
      if (hasPrevPage) {
        prevURL = url.replace(`page=${currentPage}`, `page=${prevPage}`);
      }
  
      if (hasNextPage) {
        nextURL = url.replace(`page=${currentPage}`, `page=${nextPage}`);
      }
  
      res.render("listOfUsers", {
        users: response,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        currentPage: currentPage,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevURL,
        nextLink: nextURL
      });
    } catch (err) {
      console.error('Error al obtener los usuarios', err);
      res.status(500).send('Error al obtener los usuarios');
    }
  };
  



  export const deleteUsers = async (req, res) => {
    try {
      // Calcular la fecha límite (hace 2 días)

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
    // Buscar y eliminar los usuarios que no estan activos

    const deletedUsers = await userModel.deleteMany({ lastConnection: { $lt: twoDaysAgo } });
  
      // Enviar correo a los usuarios eliminados

      deletedUsers.forEach(async (user) => {
        await sendEmail(user.email, "Eliminación de cuenta por inactividad", "Tu cuenta ha sido eliminada por inactividad.");
      });
  
      res.status(200).json({ status: "success", message: "Usuarios eliminados correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  };




export const adminChangesRol = async (req, res) => {
    try {
      const userId = req.body.userId || req.params.userId; // Obtener el ID del usuario de req.body o req.params según corresponda
  
      // Comprobar existencia del usuario
      const response = await userModel.findById(userId);
      if (!response) {
        return res.status(404).json({ status: "error", message: "El usuario no está registrado" });
      }
  
      // Comprobar rol del usuario
      if (response.rol === "Admin") {
        return res.status(400).json({
          status: "error",
          message:
            "El usuario tiene el rol de Administrador, no es posible realizar el cambio de rol",
        });
      }
  
      // realizar el cambio de rol del usuario
      let result;
      if (response.rol === "Premium") {
        await userModel.findByIdAndUpdate(userId, { rol: "Usuario" });
        result = await userModel.findById(userId);
      } else {
        await userModel.findByIdAndUpdate(userId, { rol: "Premium" });
        result = await userModel.findById(userId);
      }
  
      console.log(result);
      res.status(200).json({ status: "success", payload: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  };
  
  export default adminChangesRol;
  