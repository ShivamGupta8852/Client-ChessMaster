import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://chessmaster-online.onrender.com/api/user/login", formData);
      // const res = await axios.post("http://localhost:8001/api/user/login", formData);
      if (res.data.success) {
        toast.success(res.data.message, { theme: "dark", autoClose: 1000 });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && !error.response.data.success) {
        toast.warn(error.response.data.message, { theme: "dark", autoClose: 1000 });
      } else {
        toast.error("An unexpected error occurred", { theme: "dark", autoClose: 1000 });
      }
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Login with Google clicked");
  };

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen pt-16">
    <div className="w-full max-w-lg bg-slate-800 p-8 my-4 rounded-lg shadow-md">
      <h1 className="text-[1.45rem] md:text-[1.75rem] font-semibold text-center text-white mb-4">
        Welcome Back to ChessMaster
      </h1>
      <h2 className="text-2xl font-semibold text-center text-green-300 mb-6">
      Log in to continue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block font-medium text-sm text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="someone@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium text-sm text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex items-center my-6">
        <hr className="flex-grow border-t border-gray-600" />
        <span className="mx-4 text-white">or</span>
        <hr className="flex-grow border-t border-gray-600" />
      </div>
      <div className="flex justify-center items-center gap-x-2 mt-6 w-full py-2 px-4 bg-slate-950 hover:bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
           onClick={handleGoogleLogin}>
        <FcGoogle />
        <span className="text-white">Login with Google</span>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-white">
        Don't have an account?{' '}
          <Link to="/signup" className="text-green-400 underline">
          Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default Login;
