import { Request, Response, NextFunction } from "express";
import {
  addOrderValidator,
  updateOrderStatusValidator,
} from "../validators/OrderValidator";
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import Cart from "../models/Cart";
import mongoose from "mongoose";

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUser = (req as any).user._id;

    const myOrders = await Order.find({ buyer: currUser }).populate(
      "item.product"
    );

    res.send(myOrders);
  } catch (error) {
    next(error);
  }
};

export const getMySoldOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUser = (req as any).user._id;

    const soldOrders = await Order.find({
      "item.productOwner": currUser,
    })
      .populate("item.product")
      .populate("buyer");

    res.send(soldOrders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, status } = req.body;
    console.log(req.body);
    const { error } = updateOrderStatusValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUser = (req as any).user._id;

    const order = await Order.findOne({ _id: orderId }).select("status item");
    if (!order) return res.status(404).send("Order did not found");

    if (order.item.productOwner.toString() !== currUser)
      return res
        .status(403)
        .send(
          "You are not the product owner of the order. You cant do this action"
        );

    order.status = status;

    await order.save();

    res.send(order);
  } catch (error) {
    next(error);
  }
};

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SHIPPING_FEE = 40;
  const TAX_RATE = 0.012;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { checkoutItems, paymentMethod, fromCart } = req.body;

    const { error } = addOrderValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUser = await User.findOne({ _id: (req as any).user._id });
    if (!currUser) return res.status(404).send("User did found");
    // if (!currUser.address)
    //   return res.status(400).send("Set your address first before checking out");

    const productIds = checkoutItems.map((item: any) => item.product);

    const products = await Product.find({ _id: { $in: productIds } });

    for (let item of checkoutItems) {
      const matchedProduct = products.find(
        (product) => product._id.toString() === item.product
      );

      if (!matchedProduct)
        return res
          .status(404)
          .send(`Some Product did not found on the database`);

      if (matchedProduct && matchedProduct?.quantity < item.quantity)
        return res
          .status(400)
          .send(`Insufficient item quantity for ${matchedProduct.title}`);
    }

    checkoutItems.forEach(async (item: any) => {
      const { product, quantity, price, productOwner } = item;

      const subTotal = price * quantity;
      const tax = subTotal * TAX_RATE;
      const totalAmount = subTotal + tax + SHIPPING_FEE;

      const order = new Order({
        buyer: currUser._id,
        item: {
          product,
          quantity,
          price,
          productOwner,
        },
        paymentMethod,
        shippingAddress: "Diyan lang po sa knatoi",
        subTotal,
        shippingFee: SHIPPING_FEE,
        totalAmount,
        tax,
      });

      await order.save();

      const foundProduct = products.find(
        (product) => product._id.toString() === order.item.product.toString()
      );

      if (foundProduct) {
        foundProduct.quantity -= quantity;
        foundProduct.sold += quantity;
        await foundProduct.save();
      }
    });

    if (fromCart) {
      const cart = await Cart.deleteMany({ user: currUser._id });
      console.log(cart);
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).send("All Good");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
