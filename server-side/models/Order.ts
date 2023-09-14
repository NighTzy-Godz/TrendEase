import mongoose, { Schema, Document } from "mongoose";

const DB_URL = process.env.DB_URL as string;

(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database - Order");
  } catch (error) {
    console.log("Error on Order ", error);
  }
})();

enum OrderStatus {
  Processing = "Processing",
  Delivered = "Delivered",
  Recieved = "Recieved",
}

enum PaymentMethod {
  CashOnDelivery = "Cash on Delivery",
  GCash = "GCash",
}

interface ItemData {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  productOwner: mongoose.Schema.Types.ObjectId;
}

interface IOrder extends Document {
  buyer: mongoose.Schema.Types.ObjectId;
  item: ItemData;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  shippingAddress: string;
  subTotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    item: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Processing,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
