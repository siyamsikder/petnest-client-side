import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import CardSkeleton from "./CardSkeleton";
import ProductCard from "../components/ProductCard";

const Listings = () => {
  const data = useLoaderData();
  const { loading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [showData, setShowData] = useState(false);

  /* AOS Init */
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /* Fetch Categories */
  useEffect(() => {
    fetch("https://petnest-one.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  /* Skeleton delay */
  useEffect(() => {
    const timer = setTimeout(() => setShowData(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = selectedCategory === "All"
    ? data
    : data.filter(item => item.category === selectedCategory);

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "low") return (Number(a.price) || 0) - (Number(b.price) || 0);
    if (sortOrder === "high") return (Number(b.price) || 0) - (Number(a.price) || 0);
    return 0;
  });

  if (loading || !showData) {
    return (
      <section className="py-24 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-12 bg-gray-200 rounded-2xl w-48 mx-auto mb-16 animate-pulse"></div>
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
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Collection</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            Explore All <span className="text-primary font-classic">Available</span> Pets.
          </h2>

          {/* Filter & Sort Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${selectedCategory === "All"
                    ? "bg-primary text-white shadow-primary/20"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                All Items
              </button>
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${selectedCategory === cat.name
                      ? "bg-primary text-white shadow-primary/20"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="h-10 w-[1px] bg-gray-200 hidden md:block"></div>

            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered bg-white rounded-full px-6 font-bold text-gray-600 border-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="default">Sort by Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sortedData.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No listings found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedData.map((listing, index) => (
              <ProductCard key={listing._id} listing={listing} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Listings;
