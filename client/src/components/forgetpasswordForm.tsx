import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { sendCode } from "../utilis/api";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState<string>(""); // Email state
    const navigate = useNavigate(); // Navigation hook


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };


    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await sendCode(email)
            if (res)
                navigate("/reset-password");

        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                            value={email} // Bind value to state
                            onChange={handleChange} // Update state on input change
                            className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Send Reset Code
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Remember your password?{" "}
                <button
                    onClick={() => navigate("/login")}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Login
                </button>
            </p>
        </div>
    );
};

export default ForgotPasswordForm;
