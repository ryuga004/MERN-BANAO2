import { FaHeart, FaComment, FaShareAlt } from 'react-icons/fa';
import { Post } from '../utilis/types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { likePost } from '../store/postSlice';
import { likePostHandler } from '../utilis/api';

interface CardProps {
    post: Post;
}

export default function Card({ post }: CardProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLiked(post.likes.includes(`${user.id}`));
    }, [post.likes, user.id]);

    const handleLike = async () => {
        if (!user.id) {
            alert('Please log in to like a post.');
            return;
        }
        try {
            const res = await likePostHandler(post.id);
            if (res) {
                dispatch(
                    likePost({
                        postId: post.id,
                        userId: user.id,
                    })
                );
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 w-full h-[max-content]">
            <div

                className="p-6 flex flex-col justify-between min-h-[220px] space-y-6">

                <div className="space-y-3 cursor-pointer" onClick={() => navigate(`/${post.id}`)}>
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover "
                        />
                    )}
                    <h2 className="text-xl text-grey-900 font-bold leading-snug">
                        {post.title}
                    </h2>

                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {post.description}
                    </p>
                </div>


                <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-lg">
                            {post.author.username[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{post.author.username}</p>
                            <p className="text-xs text-gray-500">Author</p>
                        </div>
                    </div>


                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-1 ${isLiked ? "text-pink-500" : "text-gray-500"
                                } hover:text-pink-500 transition-colors`}
                        >
                            <FaHeart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                            <span className="text-sm font-medium"> {post.likes.length} </span>
                        </button>
                        <button
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                            <FaComment className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments.length}</span>
                        </button>
                        <button
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaShareAlt className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
