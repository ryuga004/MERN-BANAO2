
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearUser } from "../store/userSlice";
import { logoutUser } from "../utilis/api";



export default function Navbar() {
    const user = useAppSelector((state) => state.user.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        try {
            await logoutUser().then(() => {
                dispatch(clearUser())
            })

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 shadow-lg">

            <div className="flex items-center space-x-2 cursor-pointer">
                <div onClick={() => navigate("/")} className="text-2xl font-semibold">B-Social</div>
            </div>


            <div>
                {user?.username ?
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all"
                    >

                        <IoLogOutOutline className="w-5 h-5" />
                        <span>Logout</span>


                    </button>
                    :
                    < button
                        onClick={() => navigate("/login")}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all"
                    >


                        <IoLogInOutline className="w-5 h-5" />
                        <span  >Login</span>


                    </button>
                }
            </div>
        </nav >
    );
}
