import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import { v2 as cloudinary } from "cloudinary";
import PostRoutes from "./routes/post.js";
import UserRoutes from "./routes/user.js";
import { connectDB } from "./utils/feature.js";
dotenv.config();

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
// export const JWT_SECRET = process.env.JWT_SECRET;
// export const SERVICE_KEY = process.env.SERVICE_KEY;
// export const TEMPLATE_KEY = process.env.TEMPLATE_KEY;
// export const PUBLIC_KEY = process.env.PUBLIC_KEY;
// export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const JWT_SECRET = "JWT_SECRET"

export const SERVICE_KEY = "service_r6165ja";
export const TEMPLATE_KEY = "template_7dmb1pf";
export const PUBLIC_KEY = "uAiHqQpPwDuH0bVxh";
export const PRIVATE_KEY = "r0qWI-kRM9dbBNqi-TNgb";

export const api_key = "265558157221793"
export const api_secret = "fmsENcRLJOXmfqwjh28Aqq1KgXs"
export const cloud_name = "ddnkhbxqd"

cloudinary.config({
    api_key,
    api_secret,
    cloud_name
})

const app = express();


app.use(cors({
    origin: "https://mern-banao-2.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version']
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
