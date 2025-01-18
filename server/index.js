import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import { errorMiddleware } from "./middleware/error.js";

import UserRoutes from "./routes/user.js";
import PostRoutes from "./routes/post.js";
import { connectDB } from "./utils/feature.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI || "";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/post", PostRoutes);

connectDB(mongoURI);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("Server is running at " + `${PORT}`);
});
