import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { FaTag, FaMoneyBillWave, FaMapMarkerAlt, FaPaw } from "react-icons/fa";

const CategoryByListing = () => {
  const { categoryName } = useParams();
  const listings = useLoaderData();
  const navigate = useNavigate();

  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold text-gray-800">
          🐾{categoryName} Listings
        </h2>

        {listings.length === 0 ? (
          <p className="text-center text-gray-200">
            No listings found for {categoryName}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-15">
            {listings.map((listing) => (
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
                  <button
                    key={listing._id}
                    onClick={() => navigate(`/listing/${listing._id}`)}
                    className="w-full mt-4 py-2 rounded-lg bg-primary text-white font-medium shadow-md hover:opacity-90 transition">
                    View Details
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

export default CategoryByListing;
