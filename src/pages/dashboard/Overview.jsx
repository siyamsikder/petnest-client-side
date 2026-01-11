import React, { useEffect, useState } from 'react';
import { MdPets, MdPeople, MdTrendingUp, MdShoppingBag, MdVisibility, MdCalendarToday, MdList } from 'react-icons/md';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Link } from 'react-router';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

import useRole from '../../hooks/useRole';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import API_BASE_URL from '../../config/api';

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#EF4444'];

const Overview = () => {
    const { user } = useContext(AuthContext);
    const [role, roleLoading] = useRole();
    const [statsData, setStatsData] = useState(null);
    const [recentListings, setRecentListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?.email || roleLoading) return;

            try {
                const token = localStorage.getItem('access-token');
                const headers = { authorization: `Bearer ${token}` };

                const statsEndpoint = role === 'admin'
                    ? `${API_BASE_URL}/admin-stats`
                    : `${API_BASE_URL}/user-stats/${user.email}`;

                const listingsEndpoint = role === 'admin'
                    ? `${API_BASE_URL}/listings?limit=3`
                    : `${API_BASE_URL}/listings?email=${user.email}&limit=3`;

                const [statsRes, listingsRes] = await Promise.all([
                    fetch(statsEndpoint, { headers }),
                    fetch(listingsEndpoint, { headers })
                ]);

                const stats = await statsRes.json();
                const listings = await listingsRes.json();

                setStatsData(stats);
                setRecentListings(listings.slice(0, 3));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [user, role, roleLoading]);

    if (loading || roleLoading) return <LoadingSpinner />;

    const stats = role === 'admin' ? [
        { label: 'Total Pets', value: statsData?.totalPets || 0, icon: <MdPets className="text-primary" size={28} />, bg: 'bg-yellow-50' },
        { label: 'Total Users', value: statsData?.totalUsers || 0, icon: <MdPeople className="text-blue-500" size={28} />, bg: 'bg-blue-50' },
        { label: 'Total Orders', value: statsData?.totalOrders || 0, icon: <MdShoppingBag className="text-green-500" size={28} />, bg: 'bg-green-50' },
        { label: 'Growth', value: statsData?.growth || '0%', icon: <MdTrendingUp className="text-purple-500" size={28} />, bg: 'bg-purple-50' },
    ] : [
        { label: 'My Listings', value: statsData?.totalListings || 0, icon: <MdList className="text-primary" size={28} />, bg: 'bg-yellow-50' },
        { label: 'My Orders', value: statsData?.totalOrders || 0, icon: <MdShoppingBag className="text-blue-500" size={28} />, bg: 'bg-blue-50' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold font-playfair text-secondary">
                    {role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'} Overview
                </h1>
                <p className="text-gray-500">Welcome back! Here's a snapshot of {role === 'admin' ? 'PetNest system' : 'your activities'}.</p>
            </div>

            {/* Stats Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${role === 'admin' ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-6`}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                        <div className={`p-3 ${stat.bg} rounded-xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section - Only for Admin */}
            {role === 'admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bar Chart: Listings Trends */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
                        <h3 className="text-lg font-bold mb-6 text-secondary">Adoption Trends (Monthly)</h3>
                        <div className="flex-1 w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statsData?.trendsData || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="listings" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart: Category Breakdown */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
                        <h3 className="text-lg font-bold mb-6 text-secondary">Category Breakdown</h3>
                        <div className="flex-1 w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statsData?.categoryData || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {(statsData?.categoryData || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Listings Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-secondary">
                        {role === 'admin' ? 'Global Recent Listings' : 'My Recent Listings'}
                    </h3>
                    <div className="flex gap-4">
                        <Link to={role === 'admin' ? "/pets-supplies" : "/dashboard/my-items"} className="text-sm font-medium text-primary hover:underline">View All</Link>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 border-none">
                                <th className="rounded-tl-2xl">Item</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Date Added</th>
                                <th className="rounded-tr-2xl text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentListings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-400">No recent listings found.</td>
                                </tr>
                            ) : recentListings.map((listing) => (
                                <tr key={listing._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                                <img src={listing.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-bold text-secondary">{listing.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="px-3 py-1 bg-yellow-50 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">
                                            {listing.category}
                                        </span>
                                    </td>
                                    <td className="font-bold text-secondary">৳{listing.price || '0'}</td>
                                    <td className="text-gray-500 text-sm">{new Date(listing.created_at).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <Link to={`/listing/${listing._id}`} className="btn btn-sm btn-ghost text-primary hover:bg-primary/10">
                                            <MdVisibility size={18} />
                                            Details
                                        </Link>
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

export default Overview;
