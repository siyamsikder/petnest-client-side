// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router";
import { MdPets } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-10 mt-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-start">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdPets className="text-4xl text-primary" />
            <h2 className="text-2xl font-bold">PawMart</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            PawMart connects local pet owners and buyers for adoption and pet
            care products. Here, every paw finds a purpose, every product brings
            care, and every bond tells a story. 🐾
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Useful Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors duration-200">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors duration-200">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Our Promise
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            At PawMart, we believe pets aren’t just animals—they’re family. Our
            mission is to make adoption and pet care easy, loving, and filled
            with little tail-wagging moments of happiness.
          </p>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm border-t border-white/10 pt-4">
        © {new Date().getFullYear()}{" "}
        <span className="text-primary font-semibold">PawMart</span> — Crafted
        with ❤️ for every pet lover.
      </div>
    </footer>
  );
};

export default Footer;
