import express from "express";
import {
  createGemRequest,
  getMyGemRequests,
  getAllGemRequests,
  updateGemRequestStatus,
  deleteGemRequest,
  deleteMyRejectedRequest,
} from "../controllers/gemRequestCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const gemRequestRoutes = express.Router();


gemRequestRoutes.post("/", isLoggedIn, createGemRequest);
gemRequestRoutes.get("/my", isLoggedIn, getMyGemRequests);


gemRequestRoutes.get("/", isLoggedIn, isAdmin, getAllGemRequests);
gemRequestRoutes.put("/:id/status", isLoggedIn, isAdmin, updateGemRequestStatus);
gemRequestRoutes.delete("/:id", isLoggedIn, isAdmin, deleteGemRequest);
gemRequestRoutes.delete("/:id", isLoggedIn, deleteMyRejectedRequest);

export default gemRequestRoutes;
