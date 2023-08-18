import express from "express";
import { userGetData, userLogin, userRegister } from "../controller/User";
const router = express.Router();

router.get("/me", userGetData);

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
