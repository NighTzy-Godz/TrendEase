import mongoose, { Schema, Document } from "mongoose";

const DB_URL = process.env.DB_URL as string;
(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to Database - Product");
  } catch (error) {
    console.log("Error on Product ", error);
  }
})();

enum ProductCategory {
  Electronics = "electronics",
  Fashion = "fashion",
  Appliances = "appliances",
  Apparel = "apparel",
  Instruments = "instruments",
  Sports = "sports",
  HealthAndBeauty = "health and beauty",
}

interface IProduct extends Document {
  availabilty: boolean;
  title: string;
  images: string[];
  desc: string;
  price: number;
  quantity: number;
  ratings: number;
  category: ProductCategory;
  sold: number;
  owner: mongoose.Schema.Types.ObjectId;
  relatedProducts: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    availabilty: {
      type: Boolean,
      default: true,
    },

    title: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    desc: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    ratings: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      enum: Object.values(ProductCategory),
    },

    sold: {
      type: Number,
      default: 0,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
