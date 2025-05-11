import User from "../model/User.js";
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
// @desc Register user
// @route POST /api/users/register
// @access private/Adimin

export const registerUserCtrl = asyncHandler(async(req, res)=>{
    const {fullname, email, password} = req.body;
    //Check user exists
    const userExists = await User.findOne({ email });
    if(userExists) {
        //throw
    throw new Error("User already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create the user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status: "success",
        message: "User Registered Successfully",
        data: "user",
    });
});

// @desc Login user
// @route POST /api/users/login
// @access public

export const loginUserCtrl = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    //Find the user in db by email
    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status:'Success',
            message: 'User logged in successfully',
            userFound,
            token: generateToken(userFound?._id),
        });
    }else{
        throw new Error("Invalid login credentials");
    }
    
});


// @desc Get user profile
// @route GET /api/v1/users/profile
// @access private

export const getUserProfile = asyncHandler(async(req, res)=>{
    const token = getTokenFromHeader(req)
 //verify token
 const verified = verifyToken(token);
 console.log(req);
    res.json({
        msg: "Welcome to Profile Page",
    });
});


// @desc Update user shipping address
// @route GET /api/v1/users/update/shipping
// @access private

export const updateShippingAddressCtrl = asyncHandler(async(req, res)=> {
    const {firstname, lastname, address, city, province, postalCode, phone} =
     req.body;
     const user = await User.findByIdAndUpdate(req.userAuthId, {
        ShippingAddress: {
            firstname,
            lastname,
            address,
            city,
            province,
            postalCode,
            phone,
        },
        hasShippingAddress: true,
     },
     {
        new: true,
     }
    );
    //send response
    res.json({
        status: "success",
        message: "User shipping address updated Successfully",
        user,
    });
});