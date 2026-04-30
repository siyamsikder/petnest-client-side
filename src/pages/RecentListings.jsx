import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://petnest-one.vercel.app/listings?limit=3")
      .then((res) => res.json())
      .then((data) => {
        setListings(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 bg-gray-200 animate-pulse rounded-3xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recently <span className="text-primary font-classic">Added</span>
            </h2>
            <p className="text-gray-600 text-lg">
              The latest companions looking for their forever homes.
            </p>
          </div>
          <Link to="/pets-supplies">
            <button className="btn btn-outline border-gray-300 text-gray-700 hover:bg-white hover:text-primary rounded-full px-8 font-bold">
              View All Listings
            </button>
          </Link>
        </div>

        {listings.length === 0 ? (
          <p className="text-center text-gray-500 py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            No recent listings available. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {listings.map((listing, index) => (
              <ProductCard key={listing._id} listing={listing} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
