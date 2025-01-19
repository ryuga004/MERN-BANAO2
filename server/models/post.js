import { Schema, model } from "mongoose";
const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please Enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },
    author: {
        type: Schema.ObjectId,
        ref: "user",
        required: true,
    },
    image: {
        type: String,
    },
    likes: [
        {
            type: Schema.ObjectId,
            ref: "user",
        }
    ],
    comments: [
        {
            commentby: {
                type: Schema.ObjectId,
                ref: "user",
            },
            body: {
                type: String,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const Post = model("post", PostSchema);
export default Post;
