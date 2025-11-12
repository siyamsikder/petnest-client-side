import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPets } from "react-icons/md";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcf0ca] text-center p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="flex items-center justify-center px-6 py-3 rounded-lg bg-[#fbd045]  hover:bg-white hover:text-secondary
         border-none font-bold shadow hover: transition">
        <IoMdArrowRoundBack className="font-bold text-2xl" />
        <MdPets className="text-4xl text-primary" />
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
