import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";
import Accessory from "../model/Accessory.js";

// @desc create new review
// @route POST /api/v1/reviews
// @access private/admin

export const createReviewCtrl = asyncHandler(async(req, res)=>{
    const {product, message, rating} = req.body;
    //1. Find the product

    const { productID } = req.params;
    const productFound = await Product.findById(productID).populate("reviews");
    if(!productFound){
        throw new Error ("Product Not Found");
    }
    //check if user already reviewed this product
    const hasReviewed = productFound?.reviews?.find((review) => {
        return review?.user?.toString() === req?.userAuthId?.toString();
   });
    if (hasReviewed) {
        throw new Error("You have already reviewed this product");
    };
    //create review
    const review = await Review.create({
        message,
        rating,
        product: productFound?.id,
        user: req.userAuthId
    });
    //Push review into product Found
    productFound.reviews.push(review?.id)
    //resave
    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Review created successfully",
    })
});

export const createAccessoryReviewCtrl = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  const { accessoryID } = req.params;

  const accessory = await Accessory.findById(accessoryID).populate("reviews");
  if (!accessory) throw new Error("Accessory not found");

  const alreadyReviewed = accessory.reviews.find(
    (r) => r?.user?.toString() === req.userAuthId.toString()
  );
  if (alreadyReviewed) throw new Error("You have already reviewed this accessory");

  const review = await Review.create({
    message,
    rating,
    accessory: accessoryID,
    user: req.userAuthId,
  });

  accessory.reviews.push(review._id);
  await accessory.save();

  res.status(201).json({ success: true, message: "Accessory review submitted" });
});
