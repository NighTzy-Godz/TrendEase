import { Router } from "express";
import { storage } from "../cloudinary/cloudinary";

import multer from "multer";
const upload = multer({ storage });
import { createProduct, getAllProducts } from "../controller/Product";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/add-product", upload.array("img"), isAuth, createProduct);

router.get("/all-products", getAllProducts);

export default router;
