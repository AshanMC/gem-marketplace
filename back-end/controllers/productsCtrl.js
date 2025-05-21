import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import { populate } from "dotenv";

 //Create new product
 //POST /api/products
 //Private/Admin 
export const createProductCtrl = asyncHandler(async(req, res)=>{
    console.log(req.files);
     const {name, weight, description, category, user, price, totalQty } =
      req.body;
      //product exists
     const productExists = await Product.findOne({ name });
      if (productExists) {
         return res.status(400).json({
         status: "fail",
         message: "Product Already Exists",
  });
}
      //find the category
      const categoryFound = await Category.findOne({
       name: category,
      })
      if(!categoryFound){
       throw new Error(
          "Category not found, please create first or check name"
       );
      }
      //create the product
      const product = await Product.create({
         name,
         weight,
         description,
         category,
         user: req.userAuthId,
         price,
         totalQty,
         images: req.files.map(file => file.path),
      });
      //push the product into category
      categoryFound.products.push(product._id);
      //resave
      await categoryFound.save();
      //send response
      res.json({
         status: "success",
         message: "Product created successfully",
         product
      });

});

// @desc Get all products
// @route GET /api/v1/products
// @access public
export const getProductsCtrl = asyncHandler(async(req, res)=>{
   console.log(req.query);
   //query
   let productQuery = Product.find();   


 //search by name
 if(req.query.name){
   productQuery = productQuery.find({
      name: {$regex: req.query.name, $options: "i"},
   });
 }
 //find by weight
 if(req.query.weight){
   productQuery = productQuery.find({
      weight: {$regex: req.query.weight, $options: "i"},
   });
 }
  //filter by category
  if(req.query.category){
   productQuery = productQuery.find({
      category: {$regex: req.query.category, $options: "i"},
   });
 }
 //filter by price range
 if(req.query.price){
   const priceRange = req.query.price.split("-");
 //gte: greater than or equal
 //lte: less than or equal to
 productQuery = productQuery.find({
   price: {$gte: priceRange[0], $lte: priceRange[1] },
 })
 }
 //pagination
 //page
 const page = parseInt( req.query.page ) ? parseInt( req.query.page ) : 1;
 //limit
 const limit = parseInt( req.query.limit ) ? parseInt( req.query.limit ) : 10;
 //startindex
 const startIndex = (page -1) * limit;
 //endindex
 const endIndex = page * limit;
 //total
 const total = await Product.countDocuments();

 productQuery = productQuery.skip(startIndex).limit(limit);
 
 //pagination results
 const pagination = {}
 if(endIndex < total){
   pagination.next = {
      page: page + 1,
      limit,
   };
 }
 if(startIndex > 0) {
   pagination.prev = {
      page: page - 1,
      limit
   };
 }


 //await the query
 const products = await productQuery.populate("reviews")

   res.json({
      status: "success",
      total,
      results: products.length,
      pagination,
      message: "Products fetched successfully",
      products,
   });
});

// @desc Get single products
// @route GET /api/v1/products/:id
// @access public


export const getProductCtrl = asyncHandler(async(req, res)=>{
   const product = await Product.findById(req.params.id).populate("reviews");
   if(!product){
      throw new Error("Product not found");
   }
   res.json({
      status: "success",
      message: "Product fetched successfully",
      product,
   });
});


// @desc update product
// @route PUT /api/products/:id/update
// @access private/admin


export const updateProductCtrl = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // Handle existing image URLs
    let existingImages = [];
    if (req.body.existingImages) {
      if (typeof req.body.existingImages === "string") {
        existingImages = [req.body.existingImages]; // single string
      } else {
        existingImages = req.body.existingImages; // array of strings
      }
    }

    // Handle newly uploaded image files
    const uploadedImages = req.files?.map(file => file.path) || [];

    const finalImages = [...existingImages, ...uploadedImages];
    const id = req.params.id.trim();
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        category,
        images: finalImages,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("❌ Update failed:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// @desc delete product
// @route delete /api/products/:id/delete
// @access private/admin
export const deleteProductCtrl = asyncHandler(async(req, res)=>{
   await Product.findByIdAndDelete(req.params.id);
   res.json({
     status: "success",
     message: "Product deleted successfully",
   });
});
