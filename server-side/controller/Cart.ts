import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import Cart from "../models/Cart";

export const addCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;

    const currUser = (req as any).user;
    if (!currUser) return res.status(404).send("User did not found");

    const product = await Product.findOne({ _id: productId }).select("_id");
    if (!product) return res.status(404).send("Product did not found");

    const existingCart = await Cart.findOne({
      user: currUser._id,
      item: productId,
    });

    if (existingCart) return res.send("Product already in the cart");

    const cart = new Cart({
      user: currUser._id,
      item: product._id,
    });

    await cart.save();
  } catch (error) {
    next(error);
  }
};
