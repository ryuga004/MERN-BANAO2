import Post from "../models/post.js";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const createPost = TryCatch(async (req, res, next) => {
    const { title, description } = req.body;


    if (!title || !description) {
        return next(new ErrorHandler("Title and description are required", 400));
    }
    let imageUrl = null;


    if (req.file) {
        const stream = Readable.from(req.file.buffer);

        try {
            const result = await new Promise((resolve, reject) => {
                const streamUpload = cloudinary.uploader.upload_stream(
                    { folder: "posts" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );

                stream.pipe(streamUpload);
            });

            imageUrl = result.secure_url;
        } catch (error) {
            return next(new ErrorHandler("Image upload failed", 500));
        }
    }

    const post = await Post.create({
        title,
        description,
        image: imageUrl,
        author: req.userId,
    });

    if (!post) {
        return next(new ErrorHandler("Unable to create post", 500));
    }
    const data = await post.populate("author", "_id username email")
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: data,
    });
});


export const getPosts = TryCatch(async (req, res, next) => {
    const posts = await Post.find().populate("author", "_id username email");
    if (!posts) {
        return next(new ErrorHandler("Posts are not fetched", 501));
    }
    return res.status(200).json({
        success: true,
        data: posts,
    });
});


export const getPostById = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findById(id).populate("author", "_id username email");

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    return res.status(200).json({
        success: true,
        data: post,
    });
});


export const updatePost = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const post = await Post.findById(id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }


    if (!post.author.equals(req.userId)) {
        return next(new ErrorHandler("You are not the author of this post", 403));
    }
    let newImageUrl = post.image;


    if (req.file) {
        const stream = Readable.from(req.file.buffer);

        try {
            const result = await new Promise((resolve, reject) => {
                const streamUpload = cloudinary.uploader.upload_stream(
                    { folder: "posts" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );

                stream.pipe(streamUpload);
            });

            newImageUrl = result.secure_url;


            if (post.image) {
                const publicId = post.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`posts/${publicId}`);
            }
        } catch (error) {
            return next(new ErrorHandler("Image upload failed", 500));
        }
    }


    post.title = title || post.title;
    post.description = description || post.description;
    post.image = newImageUrl;

    const updatedPost = await post.save();

    return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
    });
});


export const deletePost = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    // Check if the user is the author
    if (!post.author.equals(req.userId)) {
        return next(new ErrorHandler("You are not the author of this post", 403));
    }
    const publicId = post.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`posts/${publicId}`);
    await post.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
});


export const addComment = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
        return next(new ErrorHandler("Comment body is required", 400));
    }

    const post = await Post.findById(id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    post.comments.push({
        commentby: req.userId,
        body: comment,
    });

    await post.save();
    const latest_comment = post.comments.slice(-1);
    return res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: latest_comment,
    });
});


export const likePost = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.userId;

    const post = await Post.findById(id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
        post.likes.pull(userId);
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post unliked successfully",
        });
    } else {
        post.likes.push(userId);
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
        });
    }
});


export const deleteComment = TryCatch(async (req, res, next) => {
    const { pid, cid } = req.params;
    const userId = req.userId;

    const post = await Post.findById(pid);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    const comment = post.comments.id(cid);

    if (!comment) {
        return next(new ErrorHandler("Comment not found", 404));
    }

    if (!comment.commentby.equals(userId)) {
        return next(new ErrorHandler("You can only delete your own comments", 403));
    }

    post.comments.pull(cid);
    await post.save();

    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});
