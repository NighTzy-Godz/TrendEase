import express from "express";
import multer from "multer";
import { storage } from "../cloudinary/cloudinary";

const upload = multer({ storage });
import {
  addAddress,
  userChangePassword,
  userGetData,
  userLogin,
  userRegister,
  userUpdate,
} from "../controller/User";
import isPasswordMatch from "../middleware/isPasswordMatch";
import isAuth from "../middleware/isAuth";
const router = express.Router();

router.get("/me", isAuth, userGetData);

router.put("/change-pass", isAuth, userChangePassword);
router.put(
  "/update-profile",
  upload.fields([{ name: "pfp" }, { name: "cover_photo" }]),

  isAuth,
  userUpdate
);

router.post("/add-address", isAuth, addAddress);
router.post("/register", isPasswordMatch, userRegister);
router.post("/login", userLogin);

export default router;
