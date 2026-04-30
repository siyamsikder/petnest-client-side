import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';

const ProductCard = ({ listing, index }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <img
          src={listing.image}
          alt={listing.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
            {listing.category}
          </span>
          {listing.price === 0 && (
            <span className="px-4 py-1.5 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              Free Adoption
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all shadow-sm group/heart"
        >
          {isWishlisted ? (
            <FaHeart className="text-rose-500 scale-110 transition-transform" />
          ) : (
            <FaRegHeart className="group-hover/heart:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
            {listing.name}
          </h3>
          <div className="text-right">
            <p className="text-primary font-bold text-xl leading-none">
              {listing.price ? `৳${listing.price}` : 'Free'}
            </p>
            {listing.price > 0 && <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">BDT</span>}
          </div>
        </div>

        <p className="flex items-center gap-2 text-gray-500 text-sm mb-6 font-medium">
          <FaMapMarkerAlt className="text-gray-300" /> {listing.location}
        </p>

        <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed italic">
          {listing.description || "Waiting for a loving home to become their best friend forever."}
        </p>

        <div className="mt-auto">
          <Link to={`/listing/${listing._id}`}>
            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all shadow-xl shadow-gray-900/10 hover:shadow-primary/20">
              View Details <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
