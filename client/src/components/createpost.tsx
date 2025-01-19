
import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { addPost } from '../store/postSlice';
import { UserType } from '../store/userSlice';
import { createPost } from '../utilis/api';
import { Post } from '../utilis/types';

interface formDataType {
    title?: string,
    description?: string,
}

export default function CreatePost() {
    const [formData, setFormData] = useState<formDataType>({
        title: "",
        description: '',
    })
    const [file, setFile] = useState<File | null>(null);
    const user = useAppSelector<UserType>(state => state.user.user);
    const dispatch = useAppDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.username) {
            alert("please login first to create a post");
            return;
        }
        try {
            const sendData = new FormData();
            if (formData.title)
                sendData.append("title", formData.title);
            if (formData.description)
                sendData.append("description", formData.description);
            if (file)
                sendData.append("image", file);
            const res = await createPost(sendData);
            if (res) {
                const post = res.data;
                const transformedPost: Post = {
                    id: post._id,
                    title: post.title,
                    description: post.description,
                    author: {
                        id: post.author._id,
                        username: post.author.username,
                        email: post.author.email,
                    },
                    image: post.image || "",
                    likes: post.likes,
                    comments: post.comments.map((comment: any) => ({
                        id: comment._id,
                        createdby: comment.createdby,
                        body: comment.body
                    }))
                };
                dispatch(addPost(transformedPost));
            }
            setFormData({
                title: '',
                description: ""
            })
            setFile(null);
        } catch (err) {
            console.error('Error during creating a post:', err);
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

            <form onSubmit={handleSubmitForm} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea

                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Write your post content..."
                    />
                </div>
                <div>
                    <label
                        htmlFor="file"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2"
                >
                    <BsSend className="w-5 h-5" />
                    <span>Create Post</span>
                </button>
            </form>
        </div>
    );
}