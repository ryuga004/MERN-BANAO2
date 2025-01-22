import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/card';
import { addCommentHandler, deletePost, editPost } from '../utilis/api';
import { Comment, Post } from '../utilis/types';
import CommentCard from '../components/comments';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { addComment, removePost, updatePost } from '../store/postSlice';
import { BsSend, BsTrash, BsPencil } from 'react-icons/bs';

interface EditFormDataType {
    editedTitle?: string;
    editedDescription?: string;
}

export default function PostDescription() {
    const [newComment, setNewComment] = useState<string>('');
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<EditFormDataType>({});
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);
    const user = useAppSelector((state) => state.user.user);
    const post = useAppSelector((state) =>
        state.posts.posts.find((p: Post) => p.id === id)
    );

    useEffect(() => {
        if (post) {
            setEditForm({
                editedTitle: post.title,
                editedDescription: post.description,
            });
        }
    }, [post]);

    const handleDeletePost = async () => {
        try {
            const res = await deletePost(id);
            if (res) {
                dispatch(removePost(id));
                navigate('/');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (editForm.editedTitle) formData.append("title", editForm.editedTitle)
            if (editForm.editedDescription) formData.append("description", editForm.editedDescription)
            if (file) formData.append("image", file)
            const res = await editPost({
                id: post?.id,
                formData
            });
            if (res) {
                dispatch(
                    updatePost({
                        id: post?.id,
                        editedTitle: editForm.editedTitle,
                        editedDescription: editForm.editedDescription,
                    })
                );
                setShowEdit(false);
            }
        } catch (err) {
            console.error('Error editing post:', err);
        }
    };

    const handleCancelEdit = () => {
        setShowEdit(false);
    };
    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await addCommentHandler(id, newComment);
            console.log('API Response:', res.data);
            if (res.data && res.data[0]) {
                const comment: Comment = {
                    id: res.data[0]._id,
                    createdby: res.data[0].commentby,
                    body: res.data[0].body
                };
                console.log('Comment before dispatch:', comment);

                if (post?.id) {
                    dispatch(addComment({
                        postId: post?.id,
                        comment
                    }));
                } else {
                    console.log('Post ID is undefined');
                }
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    {post && <Card post={post} />}
                </div>

                {user.id === post?.author?.id && (
                    <div className="flex justify-end p-4 space-x-4 border-t border-gray-200">
                        <button
                            onClick={() => setShowEdit(!showEdit)}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
                        >
                            <BsPencil className="w-5 h-5" />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={handleDeletePost}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition"
                        >
                            <BsTrash className="w-5 h-5" />
                            <span>Delete</span>
                        </button>
                    </div>
                )}

                <form
                    onSubmit={handleAddComment}
                    className="flex items-center px-6 py-4 border-t border-gray-200 bg-gray-50"
                >
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        value={newComment}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewComment(e.target.value)
                        }
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <BsSend className="w-5 h-5" />
                    </button>
                </form>

                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">Comments</h2>
                    <div className="space-y-4">
                        {post &&
                            post.comments.map((comment: Comment) => (
                                <CommentCard
                                    key={comment.id}
                                    cid={comment.id}
                                    pid={post.id}
                                    body={comment.body}
                                    createdby={comment.createdby}
                                />
                            ))}
                    </div>
                </div>
            </main>

            {showEdit && (
                <aside className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>
                        <form onSubmit={handleSubmitForm} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="editedTitle"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="editedTitle"
                                    name="editedTitle"
                                    value={editForm.editedTitle}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter post title"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="editedDescription"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="editedDescription"
                                    name="editedDescription"
                                    value={editForm.editedDescription}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Write your post content..."
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="file"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Edit Image
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
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </aside>
            )}
        </div>
    );
}
