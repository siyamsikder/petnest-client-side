import React, { useEffect, useState } from 'react';
import { MdPets, MdPeople, MdTrendingUp, MdShoppingBag, MdVisibility, MdCalendarToday } from 'react-icons/md';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Link } from 'react-router';

const Overview = () => {
    const [statsData, setStatsData] = useState(null);
    const [recentListings, setRecentListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, listingsRes] = await Promise.all([
                    fetch('https://petnest-one.vercel.app/admin-stats'),
                    fetch('https://petnest-one.vercel.app/listings?limit=3')
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
    }, []);

    if (loading) return <LoadingSpinner />;

    const stats = [
        { label: 'Total Pets', value: statsData?.totalPets || 0, icon: <MdPets className="text-primary" size={28} />, bg: 'bg-yellow-50' },
        { label: 'Total Users', value: statsData?.totalUsers || 0, icon: <MdPeople className="text-blue-500" size={28} />, bg: 'bg-blue-50' },
        { label: 'Total Orders', value: statsData?.totalOrders || 0, icon: <MdShoppingBag className="text-green-500" size={28} />, bg: 'bg-green-50' },
        { label: 'Growth', value: statsData?.growth || '0%', icon: <MdTrendingUp className="text-purple-500" size={28} />, bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold font-playfair text-secondary">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back! Here's a snapshot of your pet nest.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Recent Listings Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-secondary">Recent Listings (Last 3)</h3>
                    <Link to="/pets-supplies" className="text-sm font-medium text-primary hover:underline">View All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentListings.length === 0 ? (
                        <div className="col-span-3 bg-white p-10 rounded-2xl border border-dashed border-gray-200 text-center text-gray-400">
                            No listings found.
                        </div>
                    ) : recentListings.map((listing) => (
                        <div key={listing._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="relative h-40">
                                <img
                                    src={listing.image}
                                    alt={listing.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2">
                                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold rounded-lg text-secondary">
                                        {listing.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-secondary truncate">{listing.name}</h4>
                                    <span className="text-primary font-bold text-sm">৳{listing.price || 'Free'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <MdCalendarToday size={14} />
                                    <span>{listing.created_at ? new Date(listing.created_at).toLocaleDateString() : 'Just now'}</span>
                                </div>
                                <Link to={`/listing/${listing._id}`}>
                                    <button className="btn btn-sm btn-ghost w-full gap-2 text-primary hover:bg-primary/10 rounded-lg">
                                        <MdVisibility size={16} />
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Section Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                    <h3 className="text-lg font-bold mb-6 text-secondary">Adoption Trends</h3>
                    <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                        <p className="flex items-center gap-2">
                            <MdTrendingUp size={24} />
                            Trends Data Placeholder
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                    <h3 className="text-lg font-bold mb-6 text-secondary">Category Breakdown</h3>
                    <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                        <p className="flex items-center gap-2">
                            Distribution Map Placeholder
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
