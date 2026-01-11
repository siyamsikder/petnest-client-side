import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import {
    MdDashboard,
    MdPerson,
    MdList,
    MdPeopleAlt,
    MdExitToApp,
    MdArrowBack,
    MdAdd
} from 'react-icons/md';
import { AuthContext } from '../contexts/AuthContext';
import useRole from '../hooks/useRole';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Sidebar = () => {
    const { signOutUser } = useContext(AuthContext);
    const [role] = useRole();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate('/');
                toast.success('Logged out successfully');
            })
            .catch(err => toast.error(err.message));
    };
    const navItems = [
        { name: 'Dashboard', path: '/dashboard/overview', icon: <MdDashboard size={22} /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <MdPerson size={22} /> },
        { name: 'My Listings', path: '/dashboard/my-items', icon: <MdList size={22} /> },
        { name: 'Add Listing', path: '/dashboard/add-listing', icon: <MdAdd size={22} /> },
    ];

    const adminItems = [
        { name: 'Manage Users', path: '/dashboard/admin/manage-users', icon: <MdPeopleAlt size={22} /> },
    ];

    return (
        <aside className="w-64 bg-secondary text-white flex flex-col h-full shadow-xl">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
                    P
                </div>
                <span className="text-xl font-bold tracking-tight">PetNest</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                    Menu
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-primary text-secondary font-medium'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}

                {role === 'admin' && (
                    <div className="pt-6">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                            Admin Section
                        </div>
                        {adminItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                        ? 'bg-primary text-secondary font-medium'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </nav>

            {/* Back to Home & Logout UI Placeholder */}
            <div className="p-4 border-t border-gray-800 mt-auto">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white transition-colors mb-2"
                >
                    <MdArrowBack size={20} />
                    <span>Back to Site</span>
                </NavLink>
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                >
                    <MdExitToApp size={20} />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
