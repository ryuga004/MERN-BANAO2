import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Company</h3>
                        <p className="text-gray-400 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="text-gray-400 mb-2">Pellentesque sit amet turpis ac velit suscipit egestas.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaFacebookF className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaLinkedinIn className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section (Copyright) */}
                <div className="mt-12 border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
