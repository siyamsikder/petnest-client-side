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
            <Link to="/add-listing" className="hover:text-primary">
              Add Listing
            </Link>
          </li>
          <li>
            <Link to="/my-listings" className="hover:text-primary">
              My Listings
            </Link>
          </li>
          <li>
            <Link to="/my-orders" className="hover:text-primary">
              My Orders
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-secondary text-white ">
      <div className="navbar shadow-lg w-10/12 mx-auto min-h-[75px]">
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
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box text-black">
              {navItems}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg">
            <MdPets className="text-4xl text-primary" />
            <span className="font-bold text-xl">PetNest</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 font-semibold">
            {navItems}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-3">
          {!user ? (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-outline btn-md border-white text-white hover:bg-white hover:text-secondary">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-md bg-primary hover:bg-[#d0ba0e] hover:text-white border-none">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "https://i.ibb.co/3z5GzKk/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              />
              <span className="hidden sm:block font-medium">
                {user.displayName || "User"}
              </span>
              <button
                onClick={handleSignOut}
                className="btn btn-sm bg-accent border-none hover:bg-white hover:text-primary text-white">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
