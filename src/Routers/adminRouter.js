import { Router } from "express";
import { authAdminMiddleware } from "../auth.js";
import adminChangesRol, { paginatedUsers } from "../Controllers/adminRouteController.js";


const adminRouter = Router();

adminRouter.get("/listOfUsers", paginatedUsers )

adminRouter.put("/listOfUsers", adminChangesRol )

adminRouter.delete ("/deleteUser", authAdminMiddleware,)



export default adminRouter 