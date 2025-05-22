import express from "express";
import { createAccessoryCtrl, getAccessoriesCtrl, getAccessoryCtrl, updateAccessoryCtrl, deleteAccessoryCtrl } from "../controllers/accessoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const accessoryRouter = express.Router();

accessoryRouter.post("/", isLoggedIn, upload.array("files"), isAdmin, createAccessoryCtrl);
accessoryRouter.get("/", getAccessoriesCtrl);
accessoryRouter.get("/:id", getAccessoryCtrl);
accessoryRouter.put("/:id", isLoggedIn, isAdmin, upload.array("files"), updateAccessoryCtrl);
accessoryRouter.delete("/:id", isLoggedIn, isAdmin, deleteAccessoryCtrl);

export default accessoryRouter;
