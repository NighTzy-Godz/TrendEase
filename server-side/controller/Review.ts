import { Request, Response, NextFunction } from "express";
import { addReviewValidator } from "../validators/ReviewValidator";
import Product from "../models/Product";
import Order from "../models/Order";
import Review from "../models/Review";
import mongoose from "mongoose";

export async function getMyReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currUser = req.user?._id;

    if (!currUser) return res.status(404).send("This user did not found");

    const myReviews = await Review.find({ reviewOwner: currUser })
      .populate("orderPost reviewOwner")
      .populate({ path: "orderPost", populate: { path: "item.product" } });

    res.send(myReviews);
  } catch (error) {
    next(error);
  }
}

export async function addReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderId, productId, content, rating } = req.body;
    const currUser = req.user?._id;
    const { error } = addReviewValidator(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findOne({ _id: productId }).select("rating");
    if (!product) return res.status(404).send("This product did not found");

    const order = await Order.findOne({ _id: orderId });
    if (!order) return res.status(404).send("This order did not found");

    const canMakeReview = !order.rated && order.status === "Recieved";
    if (!canMakeReview)
      return res
        .status(400)
        .send("Sorry but you cannot do a review at this moment");

    const productReviews = await Review.find({ productPost: productId }).select(
      "rating"
    );

    let totalStars = 0;
    productReviews.forEach((item) => {
      totalStars += item.rating;
    });

    const totalRating = totalStars / productReviews.length;
    product.ratings = totalRating;

    const review = new Review({
      orderPost: orderId,
      productPost: productId,
      reviewOwner: currUser,
      content,
      rating,
    });

    order.rated = true;

    await Promise.all([review.save(), order.save(), product.save()]);

    await session.commitTransaction();
    session.endSession();

    res.send(review);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export async function getProductReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productId } = req.params;

    const productReview = await Review.find({
      productPost: productId,
    })
      .populate("orderPost reviewOwner")
      .populate({ path: "orderPost", populate: { path: "item.product" } });

    res.send(productReview);
  } catch (error) {
    next(error);
  }
}
