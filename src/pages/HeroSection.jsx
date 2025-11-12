import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroBanner = () => {
  const bannerImg =
    "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80"; // free pet image

  return (
    <div className="relative w-full h-[450px] bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-200 flex items-center justify-center overflow-hidden">
      {/* Floating Pet Image */}
      <motion.img
        src={bannerImg}
        alt="Happy Pets"
        className="absolute bottom-0 right-10 w-64 rounded-xl shadow-lg"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Text Content */}
      <motion.div
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Find Your Furry Friend Today!
        </h1>
        <p className="text-lg md:text-xl mb-6 font-medium text-neutral-700">
          Adopt, Buy, or Sell Pet Supplies
        </p>
        <Link to="/listings">
          <button className="btn btn-primary btn-lg hover:scale-105 transition-transform">
            Browse Pets
          </button>
        </Link>
      </motion.div>

      {/* Optional Floating Paw Icons */}
      <motion.div
        className="absolute top-10 left-10 text-primary text-4xl"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}>
        🐾
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 text-pink-300 text-3xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}>
        🐾
      </motion.div>
    </div>
  );
};

export default HeroBanner;
