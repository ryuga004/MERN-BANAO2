import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

const JWT_SECRET = "JWT_SECRET"

export const isAuthenticatedUser = TryCatch(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this", 401));
    }
    const decodedData = jwt.verify(token, JWT_SECRET);
    const currentUser = await User.findById(decodedData);
    if (!currentUser) {
        return next(new ErrorHandler("Error in currentUser ", 401));
    }
    req.userId = currentUser._id;
    next();

});
