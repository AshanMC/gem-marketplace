import express from "express";
import { createAccessoryCtrl, getAccessoriesCtrl, getAccessoryCtrl, updateAccessoryCtrl, deleteAccessoryCtrl } from "../controllers/accessoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";

const accessoryRouter = express.Router();

accessoryRouter.post("/", isLoggedIn, upload.array("files"), createAccessoryCtrl);
accessoryRouter.get("/", getAccessoriesCtrl);
accessoryRouter.get("/:id", getAccessoryCtrl);
accessoryRouter.put("/:id", isLoggedIn, updateAccessoryCtrl);
accessoryRouter.delete("/:id", isLoggedIn, deleteAccessoryCtrl);

export default accessoryRouter;
