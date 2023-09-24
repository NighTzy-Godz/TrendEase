import { Request, Response, NextFunction } from "express";
import { addReviewValidator } from "../validators/ReviewValidator";
import Product from "../models/Product";
import Order from "../models/Order";
import Review from "../models/Review";
import mongoose from "mongoose";

export async function addReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderId, content, rating } = req.body;
    const currUser = (req as any).user._id;
    const { error } = addReviewValidator(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findOne({ _id: orderId });
    if (!order) return res.status(404).send("This order did not found");

    const canMakeReview = !order.rated && order.status === "Recieved";
    if (!canMakeReview)
      return res
        .status(400)
        .send("Sorry but you cannot do a review at this moment");

    const review = new Review({
      orderPost: orderId,
      reviewOwner: currUser,
      content,
      rating,
    });

    order.rated = true;

    await Promise.all([review.save(), order.save()]);

    await session.commitTransaction();
    session.endSession();

    res.send(review);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}
