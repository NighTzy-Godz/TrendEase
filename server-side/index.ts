import express, { urlencoded } from "express";
import userRoutes from "./routes/User";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log("Listening on PORT ", PORT));
