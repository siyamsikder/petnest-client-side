import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdVisibility } from 'react-icons/md';
import { AuthContext } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            if (!user?.email) return;
            try {
                const token = localStorage.getItem('access-token');
                const res = await fetch(`https://petnest-one.vercel.app/listings?email=${user.email}`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setItems(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchItems();
    }, [user?.email]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const token = localStorage.getItem('access-token');
            const res = await fetch(`https://petnest-one.vercel.app/listings/${id}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Listing deleted successfully");
                setItems(prev => prev.filter(item => item._id !== id));
            } else {
                toast.error("Failed to delete listing");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-10 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My <span className="text-primary font-classic">Listings</span></h1>
                    <p className="text-gray-500 font-medium">Manage and monitor the status of your pet collection.</p>
                </div>
                <Link to="/dashboard/add-listing">
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl flex items-center gap-3 shadow-xl shadow-gray-900/10 hover:bg-primary transition-all active:scale-95 group">
                        <MdAdd size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-bold">Register New Pet</span>
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] tracking-widest font-bold border-none">
                                <th className="py-6 pl-10">Pet Information</th>
                                <th className="py-6">Classification</th>
                                <th className="py-6">Valuation</th>
                                <th className="py-6">Status</th>
                                <th className="py-6 pr-10 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-24 text-gray-400 italic">
                                        No listings found. Start by registering your first pet!
                                    </td>
                                </tr>
                            ) : items.map((item) => (
                                <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                                    <td className="py-6 pl-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-[20px] overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg leading-tight">{item.name}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ref: {item._id.slice(-8).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <span className="px-4 py-2 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-100">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-6 font-bold text-gray-900 text-lg">
                                        {item.price === 0 || !item.price ? <span className="text-green-500">Free</span> : `৳${item.price}`}
                                    </td>
                                    <td className="py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></div>
                                            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Active</span>
                                        </div>
                                    </td>
                                    <td className="py-6 pr-10">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link to={`/listing/${item._id}`} className="p-3 bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-white rounded-xl transition-all shadow-sm">
                                                <MdVisibility size={20} />
                                            </Link>
                                            <button className="p-3 bg-gray-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-sm">
                                                <MdEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-3 bg-gray-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm">
                                                <MdDelete size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global Audit: {items.length} Registered Items</p>
                </div>
            </div>
        </div>
    );
};

export default MyItems;
