import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { userRegisterValidator } from "../validators/UserValidator";

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
