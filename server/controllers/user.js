import emailjs from "@emailjs/nodejs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { TryCatch } from "../middleware/error.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";

const JWT_SECRET = "JWT_SECRET"

const SERVICE_KEY = "service_r6165ja";
const TEMPLATE_KEY = "template_7dmb1pf";
const PUBLIC_KEY = "uAiHqQpPwDuH0bVxh";
const PRIVATE_KEY = "r0qWI-kRM9dbBNqi-TNgb";

export const registerUser = TryCatch(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email is already registered", 400));
    }


    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return res.status(201).json({
        success: true,
        message: "User successfully registered",
        data: {
            username: newUser.username,
            email: newUser.email,
        },
    });
});

export const loginUser = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }


    const user = await User.findOne({ username });
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }


    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }


    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "2d" });


    const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };

    return res.status(200).cookie("token", token, options).json({
        success: true,
        message: "User login successful",
    });
});


export const logout = TryCatch(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});


export const getUserDetails = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
        success: true,
        data: user,
    });
});


export const forgotPassword = TryCatch(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User with this email does not exist", 404));
    }

    const code = Math.floor(Math.random() * 9000 + 1000);

    user.forgotPasswordConfirmationCode = code;
    await user.save();

    emailjs.init({
        publicKey: PUBLIC_KEY,
        privateKey: PRIVATE_KEY,
    });

    emailjs.send(SERVICE_KEY, TEMPLATE_KEY, {
        from_name: "B-Social",
        to_email: email,
        message: `Your Password Reset Token is ${code}`,
    }, {
        publicKey: PUBLIC_KEY,
        privateKey: PRIVATE_KEY
    }).then(res => console.log(res)).catch(err => console.log(err));

    return res.status(200).json({
        success: true,
        message: "Password reset code sent to your email",
    });
});


export const setNewPassword = TryCatch(async (req, res, next) => {
    const { email, newPassword, code } = req.body;

    if (!email || !newPassword || !code) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User with this email does not exist", 404));
    }

    if (user.forgotPasswordConfirmationCode !== parseInt(code)) {
        user.forgotPasswordConfirmationCode = Math.floor(Math.random() * 9000 + 1000);
        await user.save();

        return next(new ErrorHandler("Invalid confirmation code. New code generated.", 401));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordConfirmationCode = null;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
});


export const getUserById = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id).select('id username email');
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: user
    })
})