import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import {
    MdDashboard,
    MdPerson,
    MdList,
    MdPeopleAlt,
    MdExitToApp,
    MdArrowBack,
    MdAdd,
    MdShoppingBag
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
    const navItems = role === 'admin' ? [
        { name: 'Admin Overview', path: '/dashboard/overview', icon: <MdDashboard size={22} /> },
        { name: 'Manage Listings', path: '/dashboard/admin/manage-listings', icon: <MdList size={22} /> },
        { name: 'All Orders', path: '/dashboard/admin/all-orders', icon: <MdShoppingBag size={22} /> },
        { name: 'Manage Users', path: '/dashboard/admin/manage-users', icon: <MdPeopleAlt size={22} /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <MdPerson size={22} /> },
    ] : [
        { name: 'User Overview', path: '/dashboard/overview', icon: <MdDashboard size={22} /> },
        { name: 'My Orders', path: '/dashboard/my-orders', icon: <MdShoppingBag size={22} /> },
        { name: 'My Listings', path: '/dashboard/my-items', icon: <MdList size={22} /> },
        { name: 'Add Listing', path: '/dashboard/add-listing', icon: <MdAdd size={22} /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <MdPerson size={22} /> },
    ];

    return (
        <aside className="w-72 bg-gray-900 text-white flex flex-col h-full shadow-2xl relative z-20">
            {/* Logo Section */}
            <div className="p-8 border-b border-white/5 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
                        P
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight block">PetNest</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Production v1.0</span>
                    </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                            {role === 'admin' ? 'Admin Portal' : 'User Control'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-[2px] mb-4 px-4">
                    Main Menu
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-500 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-6 border-t border-white/5 mt-auto space-y-2">
                <NavLink
                    to="/"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white transition-all group"
                >
                    <MdArrowBack size={20} className="transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-bold">Back to Site</span>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all group"
                >
                    <MdExitToApp size={20} className="transition-transform group-hover:translate-x-1" />
                    <span className="text-sm font-bold">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
