// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router";
import { MdPets } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <MdPets className="text-2xl text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Pet<span className="text-primary font-classic">Nest</span></h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            PetNest connects ethical breeders and local adoption centers with passionate pet lovers. Every bond tells a story. 🐾
          </p>
          <div className="flex gap-4">
            {/* Social Icons would go here */}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">
            Company
          </h3>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-primary transition-all">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-all">Careers</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-all">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">
            Support
          </h3>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li><Link to="/faq" className="hover:text-primary transition-all">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-all">Contact Us</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-all">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">
            Our Promise
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed italic">
            "At PetNest, we believe pets aren’t just animals—they’re family. Our mission is to make adoption easy, ethical, and joyful."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} PetNest — Crafted with ❤️ by the Pet Lover Community.</p>
        <div className="flex gap-6">
          <Link to="/terms" className="hover:text-white transition-all">Terms</Link>
          <Link to="/terms" className="hover:text-white transition-all">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-all">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
