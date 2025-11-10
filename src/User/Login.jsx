import React, { useState } from "react";
import { Link } from "react-router";
import { CiRead } from "react-icons/ci";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="card w-full max-w-md bg-neutral text-white shadow-2xl rounded-2xl border border-white/10">
        <div className="card-body">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-primary mb-3">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-400 mb-6">
            Please login to your account
          </p>

          {/* Login Form */}
          <form>
            <fieldset className="space-y-4">
              {/* Email */}
              <div>
                <label className="label font-medium text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label font-medium text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer hover:text-primary transition-all"
                  >
                    <CiRead />
                  </span>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border-white/30"
                  />
                  Remember me
                </label>
                <a href="#" className="link text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="button"
                className="btn w-full mt-5 bg-primary hover:bg-primary/90 text-white font-semibold border-none rounded-lg transition-all"
              >
                Login
              </button>
            </fieldset>
          </form>

          {/* Divider */}
          <div className="divider text-gray-400">OR</div>

          {/* Google Button */}
          <button className="btn btn-outline w-full border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-all duration-200">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Registration Link */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Don’t have an account?
            <Link to="/register" className="text-primary font-semibold ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
