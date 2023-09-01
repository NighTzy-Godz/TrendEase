import { Router } from "express";
import { storage } from "../cloudinary/cloudinary";

import multer from "multer";
const upload = multer({ storage });
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from "../controller/Product";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/all-products", getAllProducts);
router.get("/:productId", isAuth, getSingleProduct);

router.post("/add-product", upload.array("img"), isAuth, createProduct);

export default router;
