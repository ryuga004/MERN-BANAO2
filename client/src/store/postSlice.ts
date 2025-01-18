import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Post } from "../utilis/types";

interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: [],
};

type updatePostType = {
    id?: string,
    editedTitle?: string,
    editedDescription?: string,
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action: PayloadAction<updatePostType>) => {
            state.posts.forEach((post) => {
                if (post.id === action.payload.id) {
                    post.title = action.payload.editedTitle || post.title,
                        post.description = action.payload.editedDescription || post.description
                }
            })
        },
        removePost: (state, action: PayloadAction<string | undefined>) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        likePost: (state, action: PayloadAction<{ postId: string, userId: string }>) => {
            const { postId, userId } = action.payload;
            const post = state.posts.find((post) => post.id === postId);
            if (post) {
                const isLiked = post.likes.includes(userId);
                if (isLiked) {
                    post.likes = post.likes.filter((like) => like !== userId);
                } else {
                    post.likes.push(userId);
                }
            }
        },
        addComment: (state, action: PayloadAction<{ postId: string | undefined, comment: Comment }>) => {
            const { postId, comment } = action.payload;
            console.log("COMMENT IN ACTION PAYLOAD", comment)
            const post = state.posts.find((post) => post.id === postId);
            if (post) {
                post.comments = [...post.comments, comment];
            }
        },
        deleteComment: (state, action: PayloadAction<{ postId: string, commentId: string }>) => {
            const { postId, commentId } = action.payload;
            const post = state.posts.find((post) => post.id === postId);
            if (post) {
                post.comments = post.comments.filter((comment) => comment.id !== commentId);
            }
        },
    },
});

export const {
    setPosts,
    addPost,
    updatePost,
    removePost,
    likePost,
    addComment,
    deleteComment,
} = postSlice.actions;

export default postSlice.reducer;
