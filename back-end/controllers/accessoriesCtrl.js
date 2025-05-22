import asyncHandler from "express-async-handler";
import Accessory from "../model/Accessory.js";

export const createAccessoryCtrl = asyncHandler(async (req, res) => {
  console.log("📥 Body:", req.body);
  console.log("📸 Files:", req.files);
  console.log("👤 User:", req.userAuthId);

  try {
    const { name, description, price, stockQty } = req.body;

    const accessory = await Accessory.create({
      name,
      description,
      price,
      stockQty,
      images: req.files.map((file) => file.path),
      user: req.userAuthId,
    });

    console.log("✅ Accessory created:", accessory);
    res.status(201).json({
      status: "success",
      message: "Accessory created",
      accessory,
    });
  } catch (error) {
    console.error("❌ Error creating accessory:", error.message);
    res.status(500).json({
      status: "fail",
      message: error.message || "Internal Server Error",
    });
  }
});


export const getAccessoriesCtrl = asyncHandler(async (req, res) => {
    const accessories = await Accessory.find();
    res.json({ status: "success", accessories });
});

export const getAccessoryCtrl = asyncHandler(async (req, res) => {
  const accessory = await Accessory.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "user", select: "name" }
    });

  if (!accessory) {
    res.status(404);
    throw new Error("Accessory not found");
  }

  res.json({ status: "success", accessory });
});

export const updateAccessoryCtrl = asyncHandler(async (req, res) => {
    const { name, description, price, stockQty } = req.body;
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, {
        name, description, price, stockQty
    }, { new: true });
    res.json({ status: "success", accessory });
});

export const deleteAccessoryCtrl = asyncHandler(async (req, res) => {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ status: "success", message: "Accessory deleted" });
});
