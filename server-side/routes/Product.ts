import { Router } from "express";
import { storage } from "../cloudinary/cloudinary";

import multer from "multer";
const upload = multer({ storage });
import {
  createProduct,
  getAllMyProducts,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  getTopProducts,
  updateProduct,
} from "../controller/Product";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/all-products", getAllProducts);
router.get("/my-products", isAuth, getAllMyProducts);
router.get("/:productId", getSingleProduct);

router.get("/topProducts", getTopProducts);
router.get("/latestProducts", getLatestProducts);

router.post("/add-product", upload.array("img"), isAuth, createProduct);
router.put("/edit-product/:productId", isAuth, updateProduct);

export default router;
