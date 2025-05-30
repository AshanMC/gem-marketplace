import cloudinaryPackage from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinary = cloudinaryPackage.v2

//consfigure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//create storage engine for multer
const storage = new CloudinaryStorage({
    cloudinary,
    allowFormats:['jpg', 'png', 'jpeg'],
    params:{
        folder: "Gem Marketplace"
    },
});

// Init multer with storage engine
const upload = multer({
    storage,
});



export default upload;