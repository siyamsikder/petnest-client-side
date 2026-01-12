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
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-playfair text-secondary">Manage Users</h1>
                <p className="text-gray-500 text-sm">Review, update roles, and manage user access permissions.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-2">
                        <span className="badge badge-secondary p-4 gap-2 font-medium">Total: {users.length} Users</span>
                        <span className="badge badge-primary p-4 gap-2 font-medium">Admins: {adminsCount}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600">
                                <th>User</th>
                                <th>Role</th>
                                <th>Joined Date</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-secondary">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full">
                                                    <img src={user.photo || user.avatar || 'https://i.pravatar.cc/150'} alt={user.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`flex items-center gap-1.5 font-medium ${user.role === 'admin' ? 'text-purple-600' : 'text-gray-600'}`}>
                                            {user.role === 'admin' ? <MdShield size={16} /> : <MdPersonOutline size={16} />}
                                            <span className="capitalize">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="text-sm text-gray-500">{user.joined}</td>
                                    <td>
                                        <div className={`flex items-center gap-1.5 ${user.status === 'Active' ? 'text-green-500' : 'text-red-400'}`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-400'}`}></span>
                                            <span className="text-sm font-medium">{user.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleRoleChange(user.email, user.role)}
                                                className="btn btn-ghost btn-sm text-gray-400 hover:text-purple-600 tooltip"
                                                data-tip="Change Role"
                                            >
                                                <MdAdminPanelSettings size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(user.email, user.status)}
                                                className={`btn btn-ghost btn-sm tooltip ${user.status === 'Active' ? 'text-gray-400 hover:text-red-500' : 'text-green-500 hover:text-green-700'}`}
                                                data-tip={user.status === 'Active' ? "Block User" : "Unblock User"}
                                            >
                                                {user.status === 'Active' ? <MdBlock size={20} /> : <MdCheckCircleOutline size={20} />}
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
