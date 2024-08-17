import { IoHome } from 'react-icons/io5';
import { FaPhoneVolume } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const Footer = () => {
    return (
        <footer className="bg-[#1B2132] text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* About Section */}
                    <div className="flex-1">
                        <Link to="/">
                            <img className="w-36 mb-4" src="/public/logo.png" alt="logo" />
                        </Link>
                        <p className="mb-5">
                            Discover your dream destinations with ease. Your adventure awaits.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-base font-medium">
                                <IoHome /> Chirirbandar, Dinajpur, Bangladesh
                            </div>
                            <div className="flex items-center gap-3 text-base font-medium">
                                <FaPhoneVolume /> 01787448412
                            </div>
                            <div className="flex items-center gap-3 text-base font-medium">
                                <IoIosMail /> itzmesojib@gmail.com
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="flex-1">
                        <h6 className="text-2xl font-semibold mb-4">Links</h6>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-white hover:underline">About Us</Link></li>
                            <li><Link to="/services" className="text-white hover:underline">Services</Link></li>
                            <li><Link to="/team" className="text-white hover:underline">Team</Link></li>
                            <li><Link to="/gallery" className="text-white hover:underline">Gallery</Link></li>
                            <li><Link to="/terms" className="text-white hover:underline">Terms</Link></li>
                            <li><Link to="/privacy" className="text-white hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Useful Links Section */}
                    <div className="flex-1">
                        <h6 className="text-2xl font-semibold mb-4">Useful Links</h6>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                            <li><Link to="/blogs" className="text-white hover:underline">Blog</Link></li>
                            <li><Link to="/faq" className="text-white hover:underline">FAQ</Link></li>
                            <li><Link to="/testimonials" className="text-white hover:underline">Testimonials</Link></li>
                            <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex-1">
                        <h6 className="text-2xl font-semibold mb-4">Newsletter</h6>
                        <p className="mb-4">
                            Stay updated with curated content, expert insights, tips, and community highlights in our informative newsletter. Subscribe now.
                        </p>
                        <form className="flex flex-col gap-4">
                            <input type="email" placeholder="Your Email" required className="text-black" />
                            <Button className='bg-blue-500' type="submit" color="danger">Subscribe Now</Button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className=" w-full border h-0 mt-10 border-[#FFFFFF4D] mb-2"></div>

                {/* Footer Bottom */}
                <div className="flex flex-col lg:flex-row justify-between items-center text-center">
                    <p className="text-gray-400 text-xs lg:text-base mb-4 lg:mb-0">
                        © all rights reserved, <a target="_blank" href="https://github.com/itzmesojib" className="text-white underline">Md. Sajadur Rahman</a>. 2024
                    </p>
                    <div className="hidden md:block">
                    <div className="flex gap-5">
                        <a href="#" className="text-white hover:underline">Terms & Conditions</a>
                        <a href="#" className="text-white hover:underline">Return & Refund Policy</a>
                        <a href="#" className="text-white hover:underline">Privacy Policy</a>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
