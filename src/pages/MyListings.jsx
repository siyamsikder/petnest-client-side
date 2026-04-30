import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://petnest-one.vercel.app/listings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setListings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching listings:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://petnest-one.vercel.app/listings/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Listing deleted successfully!");
        setListings((prev) => prev.filter((listing) => listing._id !== id));
      } else {
        toast.error("Failed to delete listing!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">🐾 My <span className="text-primary font-classic">Listings</span></h2>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm">
              {listings.length} Active
            </div>
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400">You haven't added any listings yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-400 uppercase text-[10px] tracking-widest font-bold border-b border-gray-100">
                    <th className="pb-4">Pet / Product</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Location</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {listings.map((listing) => (
                    <tr key={listing._id} className="border-b border-gray-50 group hover:bg-gray-50/50 transition-colors">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={listing.image}
                            alt={listing.name}
                            className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                          />
                          <span className="font-bold text-gray-900">{listing.name}</span>
                        </div>
                      </td>
                      <td className="py-6"><span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">{listing.category}</span></td>
                      <td className="py-6 font-bold text-gray-900">{listing.price === 0 ? "Free" : `৳${listing.price}`}</td>
                      <td className="py-6 text-sm">{listing.location}</td>
                      <td className="py-6 text-right">
                        <button
                          onClick={() => handleDelete(listing._id)}
                          className="px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyListings;
