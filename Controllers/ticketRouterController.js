import { Router } from "express";
import Crypto from "crypto";
import ticketModel from "../src/models/ticketModel.js";
import { noStockProducts } from "./cartsRouterDBController.js";

const router = Router();

export const getTicketModel = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpecificTicket = async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTicket = async (req, res) => {
  const myTicket = {
    code: Crypto.randomBytes(16).toString("hex").substring(0, 4),
    purchase_datetime: req.body.purchase_datetime,
    amount: req.body.amount,
    purchaser: req.body.purchaser,
    created_at: new Date(),
    updated_at: new Date(),
    noStockProducts
  };
  try {
    const ticket = await ticketModel.create(myTicket);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTicket =async (req, res) => {
  const myTicket = {
    purchase_datetime: req.body.purchase_datetime,
    amount: req.body.amount,
    purchaser: req.body.purchaser,
    updated_at: new Date(),
  };

  try {
    const ticket = await ticketModel.findByIdAndUpdate(myTicket);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  // Productos que no se pudieron comprar

  export const deleteTicket = async (req, res) => {
    try {
      const ticket = await ticketModel.findOneAndUpdate(
        { _id: req.params.id },
        { $unset: { code: Crypto.randomBytes(16).toString("hex").substring(0, 4),
        purchase_datetime: req.body.purchase_datetime,
        amount: req.body.amount,
        purchaser: req.body.purchaser,
        created_at: new Date(),
        updated_at: new Date(),} },
        { new: true }
      );
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 

export default router;