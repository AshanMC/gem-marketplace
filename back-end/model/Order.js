import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Genarate random numbers
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000)
const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            type: Object,
            required: true,
        }
    ],
    shippingAddress: {
        type: Object,
        required: true,
    },
    orderNumber:{
        type: String,
        required: true,
        default: randomTxt + randomNumbers,
    },
    paymentStatus: {
        type: String,
        default: "Not paid",
    },
    paymentMethod: {
        type: String,
        default: "Not specified",
    },
    currency: {
        type: String,
        default: "Not specified",
    },
    totalPrice: {
        type: Number,
        default: 0.0,
    },
    //for admin
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "processing", "delivered"],
    },
    deliveredAt: {
        type: Date,
    },
},
{
    timestamps:true,
}
);

//compile to form model
const Order = mongoose.model("Order", OrderSchema);

export default Order;