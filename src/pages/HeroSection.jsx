import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroBanner = () => {
  const bannerImg =
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="relative w-full h-[600px] flex items-center overflow-hidden bg-gray-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={bannerImg}
          alt="Peaceful Pets"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
            Trusted by 10,000+ Pet Lovers
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Find Your <span className="text-primary italic font-classic">Furry</span> Friend Today.
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
            PetNest connects you with ethical breeders and local adoption centers to make finding your next family member effortless.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/pets-supplies">
              <button className="btn btn-primary btn-lg px-8 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-all text-white border-none">
                Browse Pets
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-ghost btn-lg px-8 rounded-full border-gray-200 hover:bg-gray-100 transition-all text-gray-700">
                Join Community
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default HeroBanner;