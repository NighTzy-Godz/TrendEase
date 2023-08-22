import express, { urlencoded } from "express";
import userRoutes from "./routes/User";
import cors from "cors";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log("Listening on PORT ", PORT));
