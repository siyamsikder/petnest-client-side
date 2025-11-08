import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CiRead } from "react-icons/ci";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
// import logo from "../assets/logo.png"

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
    console.log(name);
    
    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        toast.success("Registration successful!");
        form.reset();
        navigate("/"); //
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // 🔹 Handle Google Sign-in
  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google login:", result.user);
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
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
          });
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center p-10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-extrabold text-center text-primary mb-4">
            Create an Account
          </h1>

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            <fieldset className="space-y-3">
              {/* Name */}
              <label className="label font-semibold text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your name"
                required
              />

              {/* Email */}
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />

              {/* Password */}
              <label className="label font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer">
                  <CiRead />
                </span>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="btn text-primary bg-white border-2 border-primary w-full mt-5 text font-semibold">
                Register
              </button>
            </fieldset>
          </form>

          {/* OR Divider */}
          <div className="divider">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignin}
            className="btn mt-2 btn-outline w-full flex items-center justify-center">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?
            <Link to="/login" className="link text-primary font-semibold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
