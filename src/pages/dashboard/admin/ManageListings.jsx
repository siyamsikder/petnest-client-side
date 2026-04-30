import React, { useEffect, useState } from 'react';
import { MdDelete, MdVisibility } from 'react-icons/md';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import API_BASE_URL from '../../../config/api';

const ManageListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/listings`);
                const data = await res.json();
                setListings(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem('access-token');
            const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            
            if (data.deletedCount > 0 || data.success) {
                toast.success("Listing removed successfully");
                setListings(prev => prev.filter(item => item._id !== id));
            } else {
                toast.error("Failed to delete listing");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-10 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage <span className="text-primary font-classic">All Listings</span></h1>
                    <p className="text-gray-500 font-medium">Review and moderate all pet and supply listings across the platform.</p>
                </div>
                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Total Active Inventory</span>
                    <span className="text-2xl font-bold text-gray-900">{listings.length} Items</span>
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] tracking-widest font-bold border-none">
                                <th className="py-6 pl-10">Product / Pet</th>
                                <th className="py-6">Classification</th>
                                <th className="py-6">Owner</th>
                                <th className="py-6">Valuation</th>
                                <th className="py-6 pr-10 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {listings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-24 text-gray-400 italic">
                                        No active listings found in the database.
                                    </td>
                                </tr>
                            ) : listings.map((item) => (
                                <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                                    <td className="py-6 pl-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-[20px] overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg leading-tight">{item.name}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">ID: {item._id.slice(-8).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <span className="px-4 py-2 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-100">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-6">
                                        <div className="text-sm font-medium text-gray-900">{item.userName || "PetNest User"}</div>
                                        <div className="text-[10px] text-gray-400 font-bold">{item.email}</div>
                                    </td>
                                    <td className="py-6 font-bold text-gray-900 text-lg">
                                        {item.price === 0 || !item.price ? <span className="text-green-500">Free</span> : `৳${item.price}`}
                                    </td>
                                    <td className="py-6 pr-10">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link to={`/listing/${item._id}`} className="p-3 bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-white rounded-xl transition-all shadow-sm tooltip" data-tip="View Details">
                                                <MdVisibility size={20} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-3 bg-gray-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm tooltip"
                                                data-tip="Delete Listing"
                                            >
                                                <MdDelete size={20} />
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

export default ManageListings;
