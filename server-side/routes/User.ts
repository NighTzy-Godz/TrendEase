import express from "express";
import { userGetData, userLogin, userRegister } from "../controller/User";
import isPasswordMatch from "../middleware/isPasswordMatch";
const router = express.Router();

router.get("/me", userGetData);

router.post("/register", isPasswordMatch, userRegister);
router.post("/login", userLogin);

export default router;
