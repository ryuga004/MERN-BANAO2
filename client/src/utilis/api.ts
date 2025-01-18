import axios from "axios";
import { Comment, Post } from "./types";
import { addPost, setPosts } from "../store/postSlice";

const baseURL: string = "http://localhost:5000/api/v1";


const api = axios.create({
    baseURL,
    withCredentials: true,
});

export const loginUser = async (username: string = "", password: string = ""): Promise<any> => {
    try {
        const response = await api.post('/user/login', {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Logout a user
export const logoutUser = async (): Promise<any> => {
    try {
        const response = await api.get('/user/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get current user details
export const getCurrentUser = async (): Promise<any> => {
    try {
        const response = await api.get('/user/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Register a new user
type registerUserType = {
    username?: string,
    email?: string,
    password?: string,
}
export const registerUser = async (formData: registerUserType): Promise<any> => {
    try {
        const response = await api.post('/user/register', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// send a reset code to this email 
export const sendCode = async (email: string): Promise<any> => {
    try {
        const response = await api.post('/user/forget-password', {
            email
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

type resetUserType = {
    code?: string,
    email?: string,
    newPassword?: string,
}
export const setPassword = async (formData: resetUserType): Promise<any> => {
    try {
        const response = await api.post('/user/set-password', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// fetch all posts 
export const fetchPosts = async (dispatch: any): Promise<any> => {
    try {
        const response = await api.get('/post/all');
        if (response.data.success) {
            const transformedPosts: Post[] = response.data.data.map((post: any) => ({
                id: post._id,
                title: post.title,
                description: post.description,
                author: {
                    id: post.author._id,
                    username: post.author.username,
                },
                likes: post.likes,
                comments: post.comments.map((comment: any) => ({
                    id: comment._id,
                    createdby: comment.createdby,
                    body: comment.body
                }))
            }));
            dispatch(setPosts(transformedPosts));
        } else {
            console.error('Failed to fetch posts: success status false');
        }
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}

// create a post 
type createPostType = {
    title?: string,
    description?: string,
}

export const createPost = async (formData: createPostType): Promise<any> => {
    try {
        const response = await api.post('/post/new', formData);
        return response.data;
    } catch (error) {
        console.error('Failed to create post:', error);
    }
}

// fetching single post 

export const getPost = async (id: string = ""): Promise<any> => {
    try {
        const response = await api.get(`/post/${id}`);
        if (response.data.success) {
            const post = response.data.data;
            const transformedPost: Post = {
                id: post._id,
                title: post.title,
                description: post.description,
                author: {
                    id: post.author._id,
                    username: post.author.username,
                    email: "",
                },
                likes: post.likes,
                comments: post.comments.map((comment: any) => ({
                    id: comment._id,
                    createdby: comment.createdby,
                    body: comment.body
                }))
            };

            return transformedPost;
        } else {
            console.log("Error in fetching the post");
        }
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}
export const deletePost = async (id: string = ""): Promise<any> => {
    try {
        const response = await api.delete(`/post/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}


interface editDataType {
    id?: string,
    editedTitle?: string,
    editedDescription?: string,
}
export const editPost = async ({ id, editedTitle, editedDescription }: editDataType): Promise<any> => {
    try {
        const response = await api.put(`/post/${id}`, {
            title: editedTitle,
            description: editedDescription
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}


export const likePostHandler = async (id: string = ""): Promise<any> => {
    try {
        const response = await api.get(`/post/like/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}
export const addCommentHandler = async (id: string = "", newComment: string): Promise<any> => {
    try {
        const response = await api.post(`/post/${id}/comment/new`, {
            comment: newComment
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}
export const deleCommentHandler = async (pid: string = "", cid: string = ""): Promise<any> => {
    try {
        const response = await api.delete(`/post/${pid}/comment/${cid}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}
export const fetchUsername = async (id: string = ""): Promise<any> => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch username:', error);
    }
}

