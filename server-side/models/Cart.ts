import mongoose, { Schema, Document } from "mongoose";
const DB_URL = process.env.DB_URL as string;

async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the Database - Cart");
  } catch (error) {
    console.log("Error on Cart ", error);
  }
};

interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  item: mongoose.Schema.Types.ObjectId;
  quantity: number;
  createAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema<ICart> = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
