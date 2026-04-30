// src/Components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { MdPets } from "react-icons/md";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/")
        toast.success("✅ Logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
      </li>
      <li>
        <Link to="/pets-supplies" className="hover:text-primary">
          Pets & Supplies
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/dashboard/add-listing" className="hover:text-primary">
              Add Listing
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-items" className="hover:text-primary">
              My Listings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-orders" className="hover:text-primary">
              My Orders
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="navbar container-wide min-h-[80px]">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-4 shadow-2xl bg-white rounded-2xl text-gray-800 w-52">
              {navItems}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MdPets className="text-2xl text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">Pet<span className="text-primary font-classic">Nest</span></span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 text-gray-600 font-medium">
            {navItems}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-ghost hover:bg-gray-50 text-gray-700 rounded-full px-6">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary text-white rounded-full px-6 shadow-lg shadow-primary/20 border-none">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-sm font-bold text-gray-900 leading-none">
                  {user.displayName || "User"}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Member</span>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-11 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition-transform shadow-xl">
                    <img
                      src={user.photoURL || "https://i.ibb.co/3z5GzKk/avatar.png"}
                      alt="User Avatar"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[10] p-4 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-52 border border-gray-50">
                  <li className="menu-title text-gray-400 font-bold px-4 py-2 uppercase text-[10px]">Account</li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/dashboard/my-items">My Listings</Link></li>
                  <li><button onClick={handleSignOut} className="text-red-500 font-bold">Logout</button></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
