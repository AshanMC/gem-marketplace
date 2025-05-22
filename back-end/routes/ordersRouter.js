import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOrderCtrl } from "../controllers/orderCtrl.js";
import { getAllOrdersCtrl, getSingleOrder, cancelOrderCtrl, updateOrderCtrl, getOrderStatsCtrl, } from "../controllers/orderCtrl.js";
const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, getAllOrdersCtrl);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStatsCtrl);               
orderRouter.get("/:id", isLoggedIn, getSingleOrder);      
orderRouter.put("/update/:id", isLoggedIn, updateOrderCtrl);
orderRouter.delete("/:id", isLoggedIn, cancelOrderCtrl);
export default orderRouter;