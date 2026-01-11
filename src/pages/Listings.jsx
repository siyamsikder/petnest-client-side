import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import {
  FaTag,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPaw,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import CardSkeleton from "./CardSkeleton";


const Listings = () => {
  const data = useLoaderData();
  const { loading } = useContext(AuthContext);

  const [showData, setShowData] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  /* AOS Init */
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: "ease-in-out",
    });
  }, []);

  /* 3 second delay */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowData(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /* Global loading or delay */
  if (loading || !showData) {
    return (
      <section className="py-16 min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 text-white bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-12 text-center"
          data-aos="fade-down"
        >
          🐾 All Listings
        </h2>

        {data.length === 0 ? (
          <p className="text-center text-gray-400" data-aos="zoom-in">
            No listings available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.map((listing, index) => (
              <div
                key={listing._id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-700 transition-transform transform hover:-translate-y-2 hover:scale-[1.03]"
              >
                {/* Image Loader */}
                <div className="relative w-full h-56">
                  {!imageLoaded[listing._id] && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl"></div>
                  )}

                  <img
                    src={listing.image}
                    alt={listing.name}
                    onLoad={() =>
                      setImageLoaded((prev) => ({
                        ...prev,
                        [listing._id]: true,
                      }))
                    }
                    className={`w-full h-56 object-cover rounded-t-2xl transition-opacity duration-500 ${
                      imageLoaded[listing._id]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </div>

                <div className="p-5 space-y-2 text-gray-200">
                  <h3 className="text-2xl font-semibold text-white">
                    {listing.name}
                  </h3>

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
                    <FaMapMarkerAlt className="text-red-500" />
                    {listing.location}
                  </p>

                  <Link to={`/listing/${listing._id}`}>
                    <button className="w-full btn btn-primary btn-lg hover:scale-105 transition-transform">
                      See Details
                    </button>
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

export default Listings;
