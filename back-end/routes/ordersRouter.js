import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOrderCtrl } from "../controllers/orderCtrl.js";
import { getAllOrdersCtrl, getSingleOrder, updateOrderStatusCtrl, cancelOrderCtrl } from "../controllers/orderCtrl.js";

const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, getAllOrdersCtrl);               
orderRouter.get("/:id", isLoggedIn, getSingleOrder);     
orderRouter.put("/:id/status", isLoggedIn, updateOrderStatusCtrl);
orderRouter.delete("/:id", isLoggedIn, cancelOrderCtrl);  
export default orderRouter;