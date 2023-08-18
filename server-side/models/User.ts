import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

const DB_URL = "mongodb://localhost:27017/trendease";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the DataBase - User"))
  .catch((err) => console.log("Error on User ", err));

interface IUser extends Document {
  pfp: string;
  cover_photo: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  balance: string;
  password: string;
  customer_orders: mongoose.Schema.Types.ObjectId[];
  genereateAuthToken(): string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  pfp: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },

  cover_photo: {
    type: String,
    default: "",
  },

  first_name: {
    type: String,
    required: true,
    trim: true,
  },

  last_name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.genereateAuthToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      full_name: this.first_name + " " + this.last_name,
    },
    "jwtPrivateKey"
  );
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
