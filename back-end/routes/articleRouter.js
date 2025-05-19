import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js';
import isAdmin from '../middlewares/isAdmin.js';
import {
  createArticleCtrl,
  getAllArticlesCtrl,
  getSingleArticleCtrl,
  updateArticleCtrl,
  deleteArticleCtrl
} from "../controllers/articleCtrl.js";

const articleRouter = express.Router();

articleRouter.post("/", isLoggedIn, isAdmin, upload.single("image"), createArticleCtrl);
articleRouter.get("/", getAllArticlesCtrl);
articleRouter.get("/:id", getSingleArticleCtrl);
articleRouter.put("/:id", isLoggedIn, isAdmin, upload.single("image"), updateArticleCtrl);
articleRouter.delete("/:id", isLoggedIn, isAdmin, deleteArticleCtrl);

export default articleRouter;
