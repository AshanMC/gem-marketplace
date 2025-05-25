import mongoose from "mongoose";

const gemRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gemName: {
      type: String,
      required: true,
    },
    weight: {
      type: Number, // in carats
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    neededDate: {
      type: Date,
      required: true,
    },
    expectedPrice: {
    type: String, // e.g. "50000 - 75000"
    required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const GemRequest = mongoose.model("GemRequest", gemRequestSchema);

export default GemRequest;
