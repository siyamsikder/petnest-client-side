import React, { useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { FaTag, FaMoneyBillWave, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Listings = () => {
  const data = useLoaderData();
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,   // animate when scrolling up
      easing: "ease-in-out",
    });
  }, []);

  if (loading) return <p className="text-center py-16 text-gray-300">Loading...</p>;

  return (
    <section className="py-16 text-white bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-white"
          data-aos="fade-down"
        >
          🐾 All Listings
        </h2>

        {data.length === 0 ? (
          <p
            className="text-center text-gray-300"
            data-aos="zoom-in"
          >
            No listings available right now.
          </p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            {data.map((listing, index) => (
              <div
                key={listing._id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100} // stagger effect
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-700 transition-transform transform hover:-translate-y-2 hover:scale-[1.03]"
              >
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
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
                    <FaMapMarkerAlt className="text-red-500" /> {listing.location}
                  </p>

                  <Link to={`/listing/${listing._id}`}>
                    <button className="w-full mt-4 py-2 rounded-lg bg-primary text-white font-medium shadow-md hover:opacity-90 transition">
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
