import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CiRead } from "react-icons/ci";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        updateUserProfile({
          displayName: name,
          photoURL: photo,
        })
          .then(async () => {
            // Save user to database
            const newUser = {
              name,
              email,
              photo
            };

            await fetch('https://petnest-one.vercel.app/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUser)
            });

            toast.success("Registration successful!");
            form.reset();
            navigate("/");
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //Handle Google
  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };

        await fetch('https://petnest-one.vercel.app/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });

        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf0ca] px-4 py-10">
      <div className="card w-full max-w-md bg-white text-gray-800 shadow-2xl rounded-2xl border border-gray-100">
        <div className="card-body">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-primary mb-6">
            Create an Account
          </h1>

          {/* Register Form */}
          <form onSubmit={handleRegister}>
            <fieldset className="space-y-4">
              {/* Name */}
              <label className="label font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none"
                placeholder="Enter your name"
                required
              />

              {/* Photo URL */}
              <label className="label font-medium text-gray-700">
                Photo URL
              </label>
              <input
                name="photo"
                type="url"
                className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none"
                placeholder="Enter your photo URL"
              />

              {/* Email */}
              <label className="label font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none"
                placeholder="Enter your email"
                required
              />

              {/* Password */}
              <label className="label font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none"
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
                className="btn w-full mt-5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg border-none shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
                Register
              </button>
            </fieldset>
          </form>

          {/* OR Divider */}
          <div className="divider text-gray-500">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignin}
            className="btn mt-2 btn-outline w-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-all duration-200">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-500 mt-5">
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
