import { Router } from "express";
import { storage } from "../cloudinary/cloudinary";
const upload = multer({ storage });
import multer from "multer";
import { createProduct } from "../controller/Product";

const router = Router();

router.post("/add-product", upload.array("img"), createProduct);

export default router;
