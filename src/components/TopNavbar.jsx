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
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
            {/* Left Section: Mobile Menu & Search */}
            <div className="flex items-center gap-4">
                <button className="md:hidden text-gray-500 hover:text-secondary p-1 rounded-md">
                    <MdMenu size={24} />
                </button>
                <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg border border-transparent focus-within:border-primary transition-all">
                    <MdSearch className="text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 lg:w-64 outline-none"
                    />
                </div>
            </div>

            {/* Right Section: Notifications & Profile */}
            <div className="flex items-center gap-4 md:gap-6">
                <button className="relative text-gray-500 hover:text-secondary transition-colors">
                    <MdNotificationsNone size={24} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-gray-200">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={user?.photoURL || "https://i.ibb.co/3z5GzKk/avatar.png"}
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
                        <li className="px-4 py-2 border-b border-gray-50 mb-2">
                            <p className="font-bold text-secondary">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className="py-2">
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/overview" className="py-2">
                                Dashboard Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className="py-2">
                                Back to Site
                            </NavLink>
                        </li>
                        <li className="mt-2 pt-2 border-t border-gray-50 text-red-500">
                            <button onClick={handleLogout} className="w-full text-left py-2 px-3 hover:bg-red-50 rounded-md">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
