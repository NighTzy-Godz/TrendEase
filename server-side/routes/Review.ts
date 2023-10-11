import { Request, Response, NextFunction } from "express";

import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  addReview,
  getMyReviews,
  getProductReviews,
} from "../controller/Review";

const router = Router();

router.get("/myReviews", isAuth, getMyReviews);
router.get("/:productId", getProductReviews);

router.post("/add-review", isAuth, addReview);

export default router;
