import mongoose, { Schema, Document } from "mongoose";

const DB_URL = process.env.DB_URL as string;
(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the Datebase - Review");
  } catch (error) {
    console.log("Error on Review ", error);
  }
})();

interface IReview extends Document {
  productPost: mongoose.Schema.Types.ObjectId;
  reviewOwner: mongoose.Schema.Types.ObjectId;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<IReview> = new mongoose.Schema(
  {
    productPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    reviewOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
