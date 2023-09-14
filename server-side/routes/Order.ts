import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  addOrder,
  getMyOrders,
  getMySoldOrders,
  updateOrderStatus,
} from "../controller/Order";

const router = Router();

router.get("/my-orders", isAuth, getMyOrders);
router.get("/my-sold-orders", isAuth, getMySoldOrders);

router.put("/updt-order-status", isAuth, updateOrderStatus);
router.post("/add-order", isAuth, addOrder);

export default router;
