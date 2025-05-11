import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;

const UserShema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        },
    
    ],
    wishlist: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList"
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasShippingAddress: {
        type: Boolean,
        default: false,
    },
    ShippingAddress: {
        firstname:{
            type: String
        },
        lastname:{
            type: String
        },
        address:{
            type: String
        },
        city:{
            type: String
        },
        province:{
            type: String
        },
        postalCode:{
            type: String
        },
        phone:{
            type: String
        },
    }

},{
    timestamps: true,
});

//compile the schema
const User = mongoose.model("User", UserShema);

export default User;