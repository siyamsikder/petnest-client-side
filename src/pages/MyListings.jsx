import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/listings?email=${user.email}`)
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
      const res = await fetch(`http://localhost:3000/listings/${id}`, {
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

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🐾 My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing._id}>
                  <td>
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td>{listing.name}</td>
                  <td>{listing.category}</td>
                  <td>{listing.price === 0 ? "Free" : `$${listing.price}`}</td>
                  <td>{listing.location}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="btn btn-error btn-xs text-white">
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
  );
};

export default MyListings;
