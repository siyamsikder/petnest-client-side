import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl">
        <div className="card-body">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-primary mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Please login to your account
          </p>

          {/* Login Form */}
          <form>
            <fieldset className="space-y-4">
              {/* Email */}
              <div>
                <label className="label font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  Remember me
                </label>
                <a href="#" className="link link-hover text-sm text-primary">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="button"
                className="btn text-primary border-2 border-primary w-full bg-white mt-4 text-lg">
                Login
              </button>
            </fieldset>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Button */}
          <button className="btn btn-outline w-full">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Registration Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <Link to="/registration" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
