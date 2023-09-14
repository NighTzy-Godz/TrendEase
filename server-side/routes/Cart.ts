import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addCart, deleteCart, getUserCart } from "../controller/Cart";

const router = Router();

router.get("/get-user-cart", isAuth, getUserCart);

router.post("/add-cart", isAuth, addCart);
router.delete("/delete-cart/:cartId", isAuth, deleteCart);

export default router;
