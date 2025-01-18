import { FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { deleteComment } from '../store/postSlice';
import { deleCommentHandler } from '../utilis/api';
import { useEffect } from 'react';

interface PropsType {
    pid: string,
    cid: string;
    createdby: string;
    body: string;
}

const CommentCard = ({ pid, cid, createdby, body }: PropsType) => {

    useEffect(() => {
        console.log("createdby changed", createdby)
    }, [createdby])
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const handleDelete = async () => {
        try {
            const res = await deleCommentHandler(pid, cid);
            if (res) {
                dispatch(deleteComment({
                    postId: pid,
                    commentId: cid
                }))
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="flex items-start justify-between bg-gray-100 p-4 rounded-lg mb-2">
            <div className="flex-1">
                <p className="text-gray-600">{body}</p>
            </div>
            {user?.id === createdby && (
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                    <FaTrash className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}

export default CommentCard;
