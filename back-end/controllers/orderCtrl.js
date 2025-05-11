import Order from "../model/Order.js";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Accessory from "../model/Accessory.js";
import Stripe from "stripe";



//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = asyncHandler(async(req, res) =>{
    //get the payload(customer, orderitems, shippingaddress, totalPrice);
    const {orderItems, shippingAddress, totalPrice} = req.body;
    //find user
    const user = await User.findById(req.userAuthId);
    //cheack if user has shipping address
    if(!user?.hasShippingAddress){
        throw new Error("Please provide Shipping Address");
    }
    //Check if order is not empty
    if(orderItems?.length <= 0){
        throw new Error("No Order Items");
    }
    //place/create order - save into DB
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice,
    });
    
    //update the product qty
    for (const item of orderItems) {
        let itemModel = item.type === "accessory" ? Accessory : Product;
        const dbItem = await itemModel.findById(item._id);
    
        if (dbItem) {
            if (item.type === "accessory") {
                if (dbItem.stockQty < item.qty) {
                    throw new Error(`Not enough stock for accessory: ${dbItem.name}`);
                }
                dbItem.soldQty += item.qty;
                dbItem.stockQty -= item.qty;
            } else {
                if (dbItem.totalQty < item.qty) {
                    throw new Error(`Not enough stock for product: ${dbItem.name}`);
                }
                dbItem.totalSold += item.qty;
                dbItem.totalQty -= item.qty;
            }
            await dbItem.save();
        }
    };
    
    //push order into user
    user.orders.push(order?._id);
    await user.save();
    //make payment (stripe)
    //convert order items to have some structure that stripe need
    const convertOrders = await Promise.all(orderItems.map(async (item) => {
    let itemModel = item.type === "accessory" ? Accessory : Product;
    const dbItem = await itemModel.findById(item._id);
    
    return {
        price_data: {
            currency: "usd",
            product_data: {
                name: dbItem.name,
                description: dbItem.description || "",
            },
            unit_amount: parseInt(dbItem.price) * 100,
        },
        quantity: item.qty,
    };
    }));
    
    const session = await stripe.checkout.sessions.create({
        line_items: convertOrders,
        metadata: {
            orderId: JSON.stringify(order?._id),
        },
        mode:"payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    res.send({url: session.url});
    
    
});
// Get all orders (Admin)
export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user');
    res.json({
        status: "success",
        orders,
    });
});
// Get single order

export const getSingleOrder = asyncHandler(async(req, res)=>{
    //get the id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    res.json({
        status: "Single Order",
        order,
    });
})



// Cancel order (User/Admin)
export const cancelOrderCtrl = asyncHandler(async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Order cancelled",
    });
});

//@desc update order to delivered
//@route PUT /api/v1/orders/update/:id
//@access pricate/admin


export const updateOrderCtrl = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status: req.body.status },
        { new: true }
    );

    if (!updatedOrder) {
        res.status(404);
        throw new Error("Order not found");
    }

    res.status(200).json({
        success: true,
        message: "Order Updated",
        updatedOrder,
    });
});