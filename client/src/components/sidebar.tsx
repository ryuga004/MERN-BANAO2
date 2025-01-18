import { CgHomeAlt } from "react-icons/cg";
import { FaPlusCircle, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useAppSelector } from "../store/hook";
import { UserType } from "../store/userSlice";



export default function Sidebar() {
    const user = useAppSelector<UserType>((state => state.user.user))
    return (
        <nav className="h-[max-content] bg-white shadow-lg rounded-lg p-4 flex flex-col">
            {/* User Info Section */}
            <div className="flex items-center space-x-3 px-4 py-2">
                <FaUser className="w-12 h-12 text-indigo-600" />
                <div>
                    <h3 className="font-semibold text-lg">{user?.username}</h3>

                </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3 mt-6">
                <button
                    aria-label="Home"
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                    <CgHomeAlt className="w-5 h-5" />
                    <span>Home</span>
                </button>

                <button
                    aria-label="Create Post"
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                    <FaPlusCircle className="w-5 h-5" />
                    <span>Create Post</span>
                </button>

                <button
                    aria-label="Settings"
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                    <FiSettings className="w-5 h-5" />
                    <span>Settings</span>
                </button>
            </div>

        </nav>
    );
}
