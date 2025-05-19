import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from '../config/fileUpload.js';


const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, isAdmin, upload.single("image"), createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id",isLoggedIn, isAdmin, deleteCategoryCtrl);
categoriesRouter.put("/:id",isLoggedIn, isAdmin, updateCategoryCtrl);

export default categoriesRouter;