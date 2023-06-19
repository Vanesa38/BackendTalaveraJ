import { Router } from "express";
import authMiddleware from "../auth.js";
import { getTicketModel, getSpecificTicket, createTicket, updateTicket, deleteTicket } from "../Controllers/ticketRouterController.js";

const router = Router();

router.get("/ticketModel", authMiddleware,getTicketModel);

router.get("/:id", authMiddleware, getSpecificTicket);

router.post("/:cid/purchase", createTicket);

router.put("/update",authMiddleware,updateTicket);

router.delete("/:id", authMiddleware, deleteTicket);

export default router;