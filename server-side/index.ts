import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import userRoutes from "./routes/User";
import productRoutes from "./routes/Product";
import cartRoutes from "./routes/Cart";
import orderRoutes from "./routes/Order";
import reviewRoutes from "./routes/Review";

import cors from "cors";

const PORT = 8080;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);

app.listen(PORT, () => console.log("Listening on PORT ", PORT));
