import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  addOrder,
  getMyRecievedOrders,
  getMyOrders,
  getMySoldOrders,
  orderProcessed,
  recievedOrder,
} from "../controller/Order";

const router = Router();

router.get("/my-orders", isAuth, getMyOrders);
router.get("/my-sold-orders", isAuth, getMySoldOrders);
router.get("/my-recieved-orders", isAuth, getMyRecievedOrders);

router.put("/order-processed", isAuth, orderProcessed);
router.put("/order-recieved", isAuth, recievedOrder);
router.post("/add-order", isAuth, addOrder);

export default router;
