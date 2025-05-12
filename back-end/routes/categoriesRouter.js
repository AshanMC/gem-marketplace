import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";


const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, isAdmin, createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id", isAdmin, deleteCategoryCtrl);
categoriesRouter.put("/:id", isAdmin, updateCategoryCtrl);

export default categoriesRouter;