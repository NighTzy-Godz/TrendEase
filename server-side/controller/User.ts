import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import {
  userAddAddress,
  userChangePasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userUpdateValidator,
} from "../validators/UserValidator";

export async function userGetData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.findOne({ _id: (req as any).user._id });
    if (!user) return res.status(404).send("User did not found");

    res.send(user);
  } catch (error) {
    next(error);
  }
}

export async function userChangePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { currPassword, newPassword, confirmPassword } = req.body;
    const { error } = userChangePasswordValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ _id: (req as any).user._id }).select(
      "password"
    );

    if (!user) return res.status(404).send("User did not found");

    const validPassword = await bcrypt.compare(currPassword, user.password);
    if (!validPassword)
      return res.status(400).send("Credentials did not match");

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .send("New Password and Confirm Password did not match");

    user.password = await bcrypt.hash(confirmPassword, 10);

    await user.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
}

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    const { error } = userRegisterValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const exisitingUser = await User.findOne({ email });
    if (exisitingUser)
      return res.status(409).send("User with this email already exist");

    const user = new User({
      first_name,
      last_name,
      email,
      phone,
    });
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
}

export async function userUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { first_name, last_name, email, phone, address, bio } = req.body;

    const { error } = userUpdateValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUser = req.user?._id;

    const foundUser = await User.findOne({ _id: currUser }).select("-password");
    if (!foundUser) return res.status(404).send("User did not found");

    foundUser.first_name = first_name;
    foundUser.last_name = last_name;
    foundUser.email = email;
    foundUser.phone = phone;
    foundUser.address = address;
    foundUser.bio = bio;

    interface FileInstance {
      [fieldname: string]: Express.Multer.File[];
    }

    const pfpFile = (req.files as FileInstance)["pfp"]
      ? (req.files as FileInstance)["pfp"][0]
      : null;
    const coverPhotoFile = (req.files as FileInstance)["cover_photo"]
      ? (req.files as FileInstance)["cover_photo"][0]
      : null;

    if (pfpFile) foundUser.pfp = pfpFile.path;
    if (coverPhotoFile) foundUser.cover_photo = coverPhotoFile.path;

    await foundUser.save();

    res.send(foundUser);
  } catch (error) {
    next(error);
  }
}

export async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User did not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).send("Credentials did not match");

    const token = user.genereateAuthToken();

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  } catch (error) {
    next(error);
  }
}

export async function addAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { address } = req.body;

    const { error } = userAddAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUser = req.user?._id;

    const foundUser = await User.findOne({ _id: currUser }).select("address");
    if (!foundUser) return res.status(404).send("User did not found");

    foundUser.address = address;

    await foundUser.save();

    res.send(foundUser);
  } catch (error) {
    next(error);
  }
}
