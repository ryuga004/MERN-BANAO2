import express from "express";
import {
    addComment,
    createPost,
    deleteComment,
    deletePost,
    getPostById,
    getPosts,
    likePost,
    updatePost,
} from "../controllers/post.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, createPost);  // Create a new post
router.get("/all", getPosts);  // Get all posts
router.get("/:id", getPostById);  // Get post by ID
router.route("/:id/comment/new").post(isAuthenticatedUser, addComment);  // Add a comment
router.route("/:pid/comment/:cid").delete(isAuthenticatedUser, deleteComment);  // Delete a comment
router.route("/like/:id").get(isAuthenticatedUser, likePost);  // Like/unlike a post (use POST or PUT for actions like this)
router.route("/:id").put(isAuthenticatedUser, updatePost).delete(isAuthenticatedUser, deletePost);  // Update and delete a post

export default router;
