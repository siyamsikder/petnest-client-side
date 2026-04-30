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

                if (!statsRes.ok) throw new Error(`Stats fetch failed: ${statsRes.status}`);
                if (!listingsRes.ok) throw new Error(`Listings fetch failed: ${listingsRes.status}`);

                const stats = await statsRes.json();
                const listings = await listingsRes.json();

                setStatsData(stats || {});
                setRecentListings(Array.isArray(listings) ? listings.slice(0, 3) : []);
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
        <div className="space-y-12 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {role === 'admin' ? 'System' : 'My'} <span className="text-primary font-classic">Dashboard</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Welcome back, <span className="text-gray-900 font-bold">{user?.displayName}</span>! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary">
                        <MdCalendarToday />
                    </div>
                    <div className="pr-4">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Today's Date</p>
                        <p className="text-sm font-bold text-gray-900 leading-none">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${role === 'admin' ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-8`}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-6 transition-all hover:shadow-xl hover:shadow-gray-200/50 group">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section - Only for Admin */}
            {role === 'admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Bar Chart */}
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 h-[450px] flex flex-col">
                        <h3 className="text-xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Adoption Trends
                        </h3>
                        <div className="flex-1 w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statsData?.trendsData || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600}} />
                                    <Tooltip 
                                        cursor={{ fill: '#f9fafb', radius: 10 }} 
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '20px' }} 
                                    />
                                    <Bar dataKey="listings" fill="#F59E0B" radius={[10, 10, 10, 10]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 h-[450px] flex flex-col">
                        <h3 className="text-xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            Category Distribution
                        </h3>
                        <div className="flex-1 w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statsData?.categoryData || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {(statsData?.categoryData || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '20px' }} />
                                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Listings Table */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {role === 'admin' ? 'Recent Activity' : 'My Recent Submissions'}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">Tracking the latest additions to PetNest.</p>
                    </div>
                    <Link to={role === 'admin' ? "/pets-supplies" : "/dashboard/my-items"} className="px-6 py-3 bg-gray-50 text-gray-900 rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all shadow-sm">
                        View All Records
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] tracking-widest font-bold border-none">
                                <th className="py-6 pl-10">Listing Information</th>
                                <th className="py-6">Category</th>
                                <th className="py-6">Valuation</th>
                                <th className="py-6">Date Added</th>
                                <th className="py-6 pr-10 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {recentListings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-24 text-gray-400 italic">No activity recorded yet.</td>
                                </tr>
                            ) : recentListings.map((listing) => (
                                <tr key={listing._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                                    <td className="py-6 pl-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-[20px] overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                                                <img src={listing.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-900 block text-lg">{listing.name}</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MdVisibility /> ID: {listing._id.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <span className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20">
                                            {listing.category}
                                        </span>
                                    </td>
                                    <td className="py-6 font-bold text-gray-900 text-lg">
                                        {listing.price ? `৳${listing.price}` : <span className="text-green-500">Free</span>}
                                    </td>
                                    <td className="py-6 text-gray-500 font-medium">
                                        {new Date(listing.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="py-6 pr-10 text-right">
                                        <Link to={`/listing/${listing._id}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                                            View Report
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
