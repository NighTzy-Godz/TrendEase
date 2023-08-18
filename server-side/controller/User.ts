import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import {
  userLoginValidator,
  userRegisterValidator,
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
      .header("acces-control-expose-headers", "x-auth-token")
      .send(user);
  } catch (error) {
    next(error);
  }
}
