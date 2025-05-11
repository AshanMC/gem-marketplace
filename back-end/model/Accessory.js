import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, ref: "Category", required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    stockQty: { type: Number, required: true },
    soldQty: { type: Number, default: 0 },
    images: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

AccessorySchema.virtual("availableQty").get(function() {
    return this.stockQty - this.soldQty;
});

AccessorySchema.virtual("totalReviews").get(function() {
    return this.reviews?.length || 0;
});

const Accessory = mongoose.model("Accessory", AccessorySchema);
export default Accessory;
