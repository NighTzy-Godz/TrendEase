import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addCart } from "../controller/Cart";

const router = Router();

router.post("/add-cart", isAuth, addCart);

export default router;
