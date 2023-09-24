import { Request, Response, NextFunction } from "express";

import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addReview } from "../controller/Review";

const router = Router();

router.post("/add-review", isAuth, addReview);

export default router;
