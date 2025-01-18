import { Schema, model } from "mongoose";

import validator from "validator";
const UserSchema = new Schema({
    username: {
        type: String,
        unique: [true, "Username Already Exist"],
        required: [true, "Please Enter Username"]
    },
    email: {
        type: String,
        unique: [true, "Email Already Exist"],
        required: [true, "Please Enter Email"],
        validate: validator.default.isEmail,
    },
    password: {
        type: String,
        required: [true, "Enter a Password"],
    },
    forgotPasswordConfirmationCode: {
        type: Number,
        minLength: 4,
        maxLength: 4,
    },
}, {
    timestamps: true,
});
const User = model("user", UserSchema);
export default User;
