import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CiRead } from "react-icons/ci";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle email-password registration
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name)

    createUser(email, password)
      .then((result) => {
        toast.success("Registration successful!");
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // 🔹 Handle Google Sign-in
  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="card w-full max-w-md bg-neutral text-white shadow-2xl rounded-2xl border border-white/10">
        <div className="card-body">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-primary mb-6">
            Create an Account
          </h1>

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            <fieldset className="space-y-4">
              {/* Name */}
              <label className="label font-medium text-gray-200">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                placeholder="Enter your name"
                required
              />

              {/* Email */}
              <label className="label font-medium text-gray-200">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                placeholder="Enter your email"
                required
              />

              {/* Password */}
              <label className="label font-medium text-gray-200">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer hover:text-primary transition">
                  <CiRead />
                </span>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="btn w-full mt-5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg border-none">
                Register
              </button>
            </fieldset>
          </form>

          {/* OR Divider */}
          <div className="divider text-gray-400">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignin}
            className="btn mt-2 btn-outline w-full border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-all duration-200">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
