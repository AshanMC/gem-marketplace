import express from "express";
import { createAccessoryCtrl, getAccessoriesCtrl, getAccessoryCtrl, updateAccessoryCtrl, deleteAccessoryCtrl } from "../controllers/accessoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const accessoryRouter = express.Router();

accessoryRouter.post("/", isLoggedIn, createAccessoryCtrl);
accessoryRouter.get("/", getAccessoriesCtrl);
accessoryRouter.get("/:id", getAccessoryCtrl);
accessoryRouter.put("/:id", isLoggedIn, updateAccessoryCtrl);
accessoryRouter.delete("/:id", isLoggedIn, deleteAccessoryCtrl);

export default accessoryRouter;
