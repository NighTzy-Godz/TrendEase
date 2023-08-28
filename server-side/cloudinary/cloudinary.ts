import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ShopNet",
    allowed_formats: ["jpeg", "jpg", "png"],
  } as any,
});

export { storage, cloudinary };
