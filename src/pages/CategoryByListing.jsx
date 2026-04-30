import React, { useContext, useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router";
import {
  FaTag,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPaw,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import CardSkeleton from "./CardSkeleton";

import AOS from "aos";
import "aos/dist/aos.css";

import ProductCard from "../components/ProductCard";

const CategoryByListing = () => {
  const { categoryName } = useParams();
  const loaderData = useLoaderData();
  const listings = Array.isArray(loaderData) ? loaderData : [];
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-12 bg-gray-200 rounded-2xl w-64 mx-auto mb-16 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[500px] bg-gray-200 rounded-[32px] animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Filtered Search</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            🐾 {categoryName} <span className="text-primary font-classic">Listings</span>
          </h2>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No listings found for {categoryName}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((listing, index) => (
              <ProductCard key={listing._id} listing={listing} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryByListing;
