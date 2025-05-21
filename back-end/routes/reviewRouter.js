import express from "express";
import { createReviewCtrl } from "../controllers/reviewsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createAccessoryReviewCtrl } from "../controllers/reviewsCtrl.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID", isLoggedIn, createReviewCtrl);
reviewRouter.post("/accessory/:accessoryID", isLoggedIn, createAccessoryReviewCtrl);

export default reviewRouter;


