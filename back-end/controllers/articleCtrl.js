import Article from "../model/Article.js";
import asyncHandler from "express-async-handler";

// CREATE
export const createArticleCtrl = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const image = req.file?.path;
  if (!title || !description || !image) {
    throw new Error("Title, description, and image are required");
  }

  const article = await Article.create({
    title,
    description,
    image,
    createdBy: req.userAuthId,
  });

  res.status(201).json({ status: "success", article });
});

// GET ALL
export const getAllArticlesCtrl = asyncHandler(async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.status(200).json(articles);
});

// GET ONE
export const getSingleArticleCtrl = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new Error("Article not found");
  res.status(200).json(article);
});

// UPDATE
export const updateArticleCtrl = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const image = req.file?.path;

  const article = await Article.findById(req.params.id);
  if (!article) throw new Error("Article not found");

  article.title = title || article.title;
  article.description = description || article.description;
  article.image = image || article.image;

  await article.save();
  res.status(200).json({ status: "updated", article });
});

// DELETE
export const deleteArticleCtrl = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) throw new Error("Article not found or already deleted");
  res.status(200).json({ message: "Article deleted successfully" });
});
