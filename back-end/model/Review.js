import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ReviewSchema = new Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Review must belong to a user"],
        },

        accessory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accessory",
        },
        message: {
            type: String,
            required: [true, "Review must belong to a product"],
        },
        rating: {
            type: Number,
            required: [true, "Please add a rating between 1 and 5"],
            min: 1,
            max: 5,
        },

    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;