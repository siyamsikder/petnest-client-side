import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { FaTag, FaMoneyBillWave, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const Listings = () => {
  const data = useLoaderData();
  const { loading } = useContext(AuthContext);
  if (loading) return <Loder />;
  return (
    <section className="py-16 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-white">
          🐾 All Listings
        </h2>
        {data.length === 0 ? (
          <p className="text-center text-gray-200">
            No listings available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.map((listing) => (
              <div
                key={listing._id}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 transition-transform transform hover:-translate-y-2">
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
                    <FaMapMarkerAlt className="text-red-500" />{" "}
                    {listing.location}
                  </p>

                  <button className="w-full mt-4 py-2 rounded-lg bg-primary text-white font-medium shadow-md hover:opacity-90 transition">
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Listings;
