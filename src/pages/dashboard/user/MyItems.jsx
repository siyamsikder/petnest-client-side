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
        if (user?.email) {
            fetch(`https://petnest-one.vercel.app/listings?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setItems(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const res = await fetch(`https://petnest-one.vercel.app/listings/${id}`, {
                method: 'DELETE'
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-playfair text-secondary">My Listings</h1>
                    <p className="text-gray-500 text-sm">Manage your pet collection and adoption status.</p>
                </div>
                <Link to="/add-listing">
                    <button className="btn btn-primary rounded-xl flex items-center gap-2 self-start sm:self-center shadow-lg hover:scale-105 transition-transform">
                        <MdAdd size={20} />
                        Add New Item
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600">
                                <th>Pet Details</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-secondary">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-400 font-medium">
                                        No listings found. Start by adding a pet!
                                    </td>
                                </tr>
                            ) : items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-xs text-gray-400">ID: {item._id.slice(-8).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge badge-ghost font-medium">{item.category}</div>
                                    </td>
                                    <td className="font-semibold text-secondary">
                                        {item.price === 0 || !item.price ? 'Free' : `৳${item.price}`}
                                    </td>
                                    <td>
                                        <span className={`badge border-none px-3 bg-green-100 text-green-700`}>
                                            Available
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/listing/${item._id}`}>
                                                <button className="btn btn-square btn-ghost btn-sm text-gray-400 hover:text-secondary group">
                                                    <MdVisibility size={20} />
                                                </button>
                                            </Link>
                                            <button className="btn btn-square btn-ghost btn-sm text-blue-400 hover:text-blue-600">
                                                <MdEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-square btn-ghost btn-sm text-red-400 hover:text-red-600">
                                                <MdDelete size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs text-gray-400">Showing {items.length} items</p>
                </div>
            </div>
        </div>
    );
};

export default MyItems;
