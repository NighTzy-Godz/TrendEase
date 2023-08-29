import { Router } from "express";
import { storage } from "../cloudinary/cloudinary";

import multer from "multer";
const upload = multer({ storage });
import { createProduct } from "../controller/Product";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/add-product", upload.array("img"), isAuth, createProduct);

export default router;
