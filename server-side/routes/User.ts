import express from "express";
import { userGetData, userLogin, userRegister } from "../controller/User";
import isPasswordMatch from "../middleware/isPasswordMatch";
import isAuth from "../middleware/isAuth";
const router = express.Router();

router.get("/me", isAuth, userGetData);

router.post("/register", isPasswordMatch, userRegister);
router.post("/login", userLogin);

export default router;
