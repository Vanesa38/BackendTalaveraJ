import { Router } from "express";
import { renderPurchase } from "../Controllers/endofpurchaseController.js"

const Endpurchase = Router();

Endpurchase.get("/", renderPurchase);

export default Endpurchase;