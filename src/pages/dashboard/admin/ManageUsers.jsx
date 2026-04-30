import React, { useEffect, useState } from 'react';
import { MdAdminPanelSettings, MdPersonOutline, MdBlock, MdDeleteOutline, MdShield, MdCheckCircleOutline } from 'react-icons/md';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('access-token');
                const res = await fetch('https://petnest-one.vercel.app/users', {
                    headers: { authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error(`Users fetch error: ${res.status}`);
                const data = await res.json();
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (email, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (!window.confirm(`Are you sure you want to make this user an ${newRole}?`)) return;

        try {
            const token = localStorage.getItem('access-token');
            const res = await fetch(`https://petnest-one.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                toast.success(`Role updated to ${newRole}`);
                setUsers(prev => prev.map(u => u.email === email ? { ...u, role: newRole } : u));
            }
        } catch (error) {
            toast.error("Failed to update role");
        }
    };

    const handleStatusChange = async (email, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
        if (!window.confirm(`Are you sure you want to ${newStatus === 'Blocked' ? 'block' : 'unblock'} this user?`)) return;

        try {
            const token = localStorage.getItem('access-token');
            const res = await fetch(`https://petnest-one.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                toast.success(`User ${newStatus === 'Blocked' ? 'blocked' : 'unblocked'}`);
                setUsers(prev => prev.map(u => u.email === email ? { ...u, status: newStatus } : u));
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <LoadingSpinner />;

    const adminsCount = users.filter(u => u.role === 'admin').length;

    return (
        <div className="space-y-10 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">User <span className="text-primary font-classic">Management</span></h1>
                    <p className="text-gray-500 font-medium">Control platform access and assign administrative privileges.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest">
                        <MdShield size={16} /> Total: {users.length}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold uppercase tracking-widest border border-primary/20">
                        <MdAdminPanelSettings size={16} /> Admins: {adminsCount}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] tracking-widest font-bold border-none">
                                <th className="py-6 pl-10">User Identity</th>
                                <th className="py-6">Authorization</th>
                                <th className="py-6">Onboarding</th>
                                <th className="py-6">Lifecycle</th>
                                <th className="py-6 pr-10 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                                    <td className="py-6 pl-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500 bg-gray-50 p-1">
                                                <img
                                                    src={user.photo || user.avatar || 'https://i.ibb.co/3z5GzKk/avatar.png'}
                                                    alt={user.name}
                                                    className="w-full h-full rounded-xl object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg leading-tight">{user.name}</div>
                                                <div className="text-xs text-gray-400 font-medium mt-1">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${user.role === 'admin'
                                                ? 'bg-purple-50 text-purple-600 border-purple-100'
                                                : 'bg-gray-50 text-gray-500 border-gray-100'
                                            }`}>
                                            {user.role === 'admin' ? <MdShield size={14} /> : <MdPersonOutline size={14} />}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="py-6 text-sm font-bold text-gray-900">
                                        {user.joined || 'Legacy Account'}
                                    </td>
                                    <td className="py-6">
                                        <div className={`flex items-center gap-2 ${user.status === 'Active' ? 'text-green-500' : 'text-rose-500'}`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500 shadow-sm shadow-green-500/50 animate-pulse' : 'bg-rose-500 shadow-sm shadow-rose-500/50'}`}></span>
                                            <span className="text-xs font-bold uppercase tracking-wider">{user.status || 'Active'}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 pr-10">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleRoleChange(user.email, user.role)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-white rounded-xl transition-all shadow-sm tooltip"
                                                data-tip="Toggle Admin Role"
                                            >
                                                <MdAdminPanelSettings size={22} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(user.email, user.status)}
                                                className={`p-3 rounded-xl transition-all shadow-sm tooltip ${user.status === 'Active'
                                                        ? 'bg-gray-50 text-rose-500 hover:bg-rose-500 hover:text-white'
                                                        : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                                                    }`}
                                                data-tip={user.status === 'Active' ? "Restrict User" : "Reactivate User"}
                                            >
                                                {user.status === 'Active' ? <MdBlock size={22} /> : <MdCheckCircleOutline size={22} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
