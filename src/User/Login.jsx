import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { CiRead } from "react-icons/ci";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInWithGoogle, resetPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Email Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleForgotPassword = () => {
    const email = prompt("Enter your email:");
    if (!email) return toast.error("Please provide an email");

    resetPassword(email)
      .then(() => toast.success("Password reset email sent!"))
      .catch((err) => toast.error(err.message));
  };

  // Google Login
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
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf0ca] px-4">
      <div className="card w-full max-w-md bg-white text-gray-800 shadow-2xl rounded-2xl border border-gray-100">
        <div className="card-body">
          <h1 className="text-4xl font-extrabold text-center text-primary mb-3">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Please login to your account
          </p>
          <form onSubmit={handleLogin}>
            <fieldset className="space-y-4">
              <div>
                <label className="label font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="label font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered w-full bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer hover:text-primary transition-all">
                    <CiRead />
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border-gray-300"
                  />
                  Remember me
                </label>
                <a
                  onClick={handleForgotPassword}
                  href="#"
                  className="link text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn w-full mt-5 bg-primary hover:bg-primary/90 text-white font-semibold border-none rounded-lg transition-all">
                Login
              </button>
            </fieldset>
          </form>

          <div className="divider text-gray-500">OR</div>
          <button
            onClick={handleGoogleSignin}
            className="btn btn-outline w-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-all duration-200">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
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
