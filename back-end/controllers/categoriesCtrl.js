import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";
// @desc create new category
// @route POST /api/v1/categories
// @access private/admin

export const createCategoryCtrl = asyncHandler(async(req, res)=>{
    const { name } = req.body;
    //category exists
    const categoryFound = await Category.findOne({name})
    if(categoryFound){
        throw new Error("Category already exists");
    }

    //create
    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Category created successfully",
        category,
    })
});

// @desc Get all categories
// @route GET /api/categories
// @access public

export const getAllCategoriesCtrl = asyncHandler(async(req, res)=>{
    const categories = await Category.find()


    res.json({
        status: "success",
        message: "Categories fetched successfully",
        categories,
    });
});

// @desc Get single category
// @route GET /api/categories/:id
// @access public
export const getSingleCategoryCtrl = asyncHandler(async(req, res)=>{
    const category = await Category.findById(req.params.id);


    res.json({
        status: "success",
        message: "Category fetched successfully",
        category,
    });
});

// update category
// PUT /api/categories/:id
// Pricate/Admin


export const updateCategoryCtrl = asyncHandler(async(req, res)=>{
   const { name } = req.body;

   //update
   const category = await Category.findByIdAndUpdate(req.params.id, 
   {
    name
   },
   {
      new: true,
   }
);
   res.json({
      status: "success",
      message: "Category updated successfully",
     product,
   });
});

// @desc delete category
// @route delete /api/categories/:id/delete
// @access private/admin
export const deleteCategoryCtrl = asyncHandler(async(req, res)=>{
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
 });
