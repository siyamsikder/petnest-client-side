import React, { useEffect, useState } from "react";
import { FaTag, FaMoneyBillWave, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { Link } from "react-router";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/listings")
      .then((res) => res.json())
      .then((data) => {
        const latest = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);
        setListings(latest);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-16 text-gray-500">Loading recent listings...</p>;
  }

  return (
    <section className="py-16 bg-[#fcf0ca]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-gray-800">
          🐾 Recent Listings
        </h2>

        {listings.length === 0 ? (
          <p className="text-center text-gray-500">No recent listings available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 transition-transform transform hover:-translate-y-2"
              >
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <div className="p-5 space-y-2 text-gray-800">
                  <h3 className="text-2xl font-semibold">{listing.name}</h3>

                  <p className="flex items-center gap-2 text-sm">
                    <FaTag className="text-primary" /> {listing.category}
                  </p>

                  <p className="flex items-center gap-2 text-sm">
                    <FaMoneyBillWave className="text-green-500" />
                    {listing.price ? (
                      `৳ ${listing.price}`
                    ) : (
                      <>
                        <FaPaw className="text-pink-500" /> Free for Adoption
                      </>
                    )}
                  </p>

                  <p className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-red-500" /> {listing.location}
                  </p>

                  <Link
                    to={`/listing/${listing._id}`}
                    className="w-full mt-4 inline-block text-center py-2 rounded-lg bg-primary text-white font-medium shadow-md hover:opacity-90 transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
