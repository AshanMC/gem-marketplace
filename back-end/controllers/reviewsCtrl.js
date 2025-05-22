import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";
import Accessory from "../model/Accessory.js";

// @desc    Create product review
// @route   POST /api/v1/reviews/product/:productID
// @access  Private
export const createReviewCtrl = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  const { productID } = req.params;

  if (!message || !rating) {
    res.status(400);
    throw new Error("Please provide both message and rating");
  }

  const productFound = await Product.findById(productID).populate("reviews");
  if (!productFound) {
    res.status(404);
    throw new Error("Product not found");
  }

  const hasReviewed = productFound.reviews.find(
    (review) => review?.user?.toString() === req.userAuthId?.toString()
  );
  if (hasReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this product");
  }

  const review = await Review.create({
    message,
    rating,
    product: productFound._id,
    user: req.userAuthId,
  });

  productFound.reviews.push(review._id);
  await productFound.save();

  res.status(201).json({
    success: true,
    message: "Product review submitted",
  });
});

// @desc    Create accessory review
// @route   POST /api/v1/reviews/accessory/:accessoryID
// @access  Private
export const createAccessoryReviewCtrl = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  const { accessoryID } = req.params;

  if (!message || !rating) {
    res.status(400);
    throw new Error("Please provide both message and rating");
  }

  const accessory = await Accessory.findById(accessoryID).populate("reviews");
  if (!accessory) {
    res.status(404);
    throw new Error("Accessory not found");
  }

  const alreadyReviewed = accessory.reviews.find(
    (r) => r?.user?.toString() === req.userAuthId?.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this accessory");
  }

  const review = await Review.create({
    message,
    rating,
    accessory: accessoryID,
    user: req.userAuthId,
  });

  accessory.reviews.push(review._id);
  await accessory.save();

  res.status(201).json({
    success: true,
    message: "Accessory review submitted",
  });
});
