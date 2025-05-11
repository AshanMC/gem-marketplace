import asyncHandler from "express-async-handler";
import Accessory from "../model/Accessory.js";

export const createAccessoryCtrl = asyncHandler(async (req, res) => {
    console.log(req.files);
    const { name, description, category, price, brand, stockQty } = req.body;
    const accessory = await Accessory.create({
        name, description, category, price, brand, stockQty,images: req.files.map(file => file.path), user: req.userAuthId
    });
    res.json({ status: "success", message: "Accessory created", accessory });
});

export const getAccessoriesCtrl = asyncHandler(async (req, res) => {
    const accessories = await Accessory.find();
    res.json({ status: "success", accessories });
});

export const getAccessoryCtrl = asyncHandler(async (req, res) => {
    const accessory = await Accessory.findById(req.params.id);
    res.json({ status: "success", accessory });
});

export const updateAccessoryCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, price, brand, stockQty } = req.body;
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, {
        name, description, category, price, brand, stockQty
    }, { new: true });
    res.json({ status: "success", accessory });
});

export const deleteAccessoryCtrl = asyncHandler(async (req, res) => {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ status: "success", message: "Accessory deleted" });
});
