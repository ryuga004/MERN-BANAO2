import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { getCurrentUser, loginUser } from "../utilis/api";
import { useAppDispatch } from "../store/hook";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

interface formType {
    username?: string;
    password?: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<formType>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await loginUser(formData);
            if (!res.success) {
                setError('Invalid username or password. Please try again.');
            } else {
                const response = await getCurrentUser();
                if (response) {
                    const user = response.data;
                    dispatch(
                        setUser({
                            id: user._id,
                            username: user.username,
                            email: user.email,
                        })
                    );
                    console.log('Login successful');
                    navigate("/");
                } else {
                    setError('Failed to fetch user details. Please try again.');
                }
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg m-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Welcome Back
                </h2>
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmitForm} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/forgot-password")}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </p>
            </div>
        </>
    );
};

export default LoginForm;
