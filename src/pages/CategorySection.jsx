import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          🐾 Browse by Category
        </h2>
        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <img
                src={category.image}
                alt={category.name}
                className="rounded-t-2xl w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  {category.name}
                </h3>
                <Link to={`/category-filtered-product/${category.name}`}>
                  <button className="btn w-full btn-primary text-white py-2 rounded-lg transition">
                    View {category.name}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
