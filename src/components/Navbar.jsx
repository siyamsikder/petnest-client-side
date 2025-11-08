import React, { useContext } from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("✅ Logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="hover:text-accent transition-colors">
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/pets-supplies"
          className="hover:text-accent transition-colors">
          Pets & Supplies
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link
              to="/add-listing"
              className="hover:text-accent transition-colors">
              Add Listing
            </Link>
          </li>
          <li>
            <Link
              to="/my-listings"
              className="hover:text-accent transition-colors">
              My Listings
            </Link>
          </li>
          <li>
            <Link
              to="/my-orders"
              className="hover:text-accent transition-colors">
              My Orders
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-primary text-white px-6 shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52 text-black">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="PetNest Logo"
            className="w-20 h-20 object-contain"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 font-medium">
          {navItems}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        {!user ? (
          <div className="flex gap-2 ">
            <Link
              to="/login"
              className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-primary">
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm bg-white text-primary hover:bg-accent hover:text-white border-none">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "https://i.ibb.co/3z5GzKk/avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="hidden sm:block font-medium">
              {user.displayName || "User"}
            </span>
            <button
              onClick={handleSignOut}
              className="btn btn-sm bg-accent border-none hover:bg-white hover:text-[#1c49c2] text-white">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
