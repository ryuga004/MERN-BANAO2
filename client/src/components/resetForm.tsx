import { useState } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../utilis/api";

interface formType {
    email?: string,
    code?: string,
    newPassword?: string,
}

const ResetForm = () => {
    const [formData, setFormData] = useState<formType>({
        email: '',
        code: '',
        newPassword: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const navigate = useNavigate();

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await setPassword(formData).then(() => {
            navigate("/login");
        }).catch((err) => console.error(err))
    }
    return (
        <>
            <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg m-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Reset Password</h2>
                <form onSubmit={handleSubmitForm} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter a  password"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Code</label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BiCodeAlt className="text-gray-400" />
                            </div>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                value={formData.code}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your code"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Reset
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Resend code ?{' '}
                    </button>
                </p>
            </div>
        </>
    )
}

export default ResetForm