import express from "express";
import { userRegister } from "../controller/User";
const router = express.Router();

router.post("/register", userRegister);

export default router;
