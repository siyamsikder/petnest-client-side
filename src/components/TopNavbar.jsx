import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { MdMenu, MdNotificationsNone, MdSearch } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const TopNavbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate('/');
                toast.success('Logged out successfully');
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Left Section: Mobile Menu & Search */}
            <div className="flex items-center gap-6">
                <button className="md:hidden text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-xl bg-gray-50">
                    <MdMenu size={24} />
                </button>
                <div className="hidden sm:flex items-center bg-gray-50 px-5 py-3 rounded-2xl border border-transparent focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-primary/5 transition-all duration-300">
                    <MdSearch className="text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-64 lg:w-80 outline-none font-medium placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Right Section: Notifications & Profile */}
            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-gray-900 transition-all p-3 rounded-2xl hover:bg-gray-50">
                    <MdNotificationsNone size={24} />
                    <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                            <img
                                alt="User Avatar"
                                src={user?.photoURL || "https://i.ibb.co/3z5GzKk/avatar.png"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-bold text-gray-900 leading-none mb-1">{user?.displayName || 'User'}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Member</p>
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-4 z-[10] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-[24px] w-64 border border-gray-100 overflow-hidden">
                        <li className="px-4 py-4 bg-gray-50 rounded-2xl mb-3">
                            <p className="font-bold text-gray-900">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className="py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all font-medium">
                                Profile Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/overview" className="py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all font-medium">
                                Dashboard Overview
                            </NavLink>
                        </li>
                        <li className="mt-3 pt-3 border-t border-gray-100">
                            <button onClick={handleLogout} className="w-full text-left py-3 px-4 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-bold">
                                Logout Session
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
