import { Router } from "express";
import authMiddleware from "../auth.js";
import { getTicketModel, getSpecificTicket, createTicket, updateTicket, deleteTicket } from "../Controllers/ticketRouterController.js";

const router = Router();

router.get("/", authMiddleware,getTicketModel);

router.get("/:id", authMiddleware, getSpecificTicket);

router.post("/:cid/purchase", authMiddleware, createTicket);

router.put("/",authMiddleware,updateTicket);

router.delete("/:id", authMiddleware, deleteTicket);

export default router;