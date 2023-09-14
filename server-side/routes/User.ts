import express from "express";
import {
  userChangePassword,
  userGetData,
  userLogin,
  userRegister,
} from "../controller/User";
import isPasswordMatch from "../middleware/isPasswordMatch";
import isAuth from "../middleware/isAuth";
const router = express.Router();

router.get("/me", isAuth, userGetData);

router.put("/change-pass", isAuth, userChangePassword);

router.post("/register", isPasswordMatch, userRegister);
router.post("/login", userLogin);

export default router;
