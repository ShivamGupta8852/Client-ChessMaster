import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import dummyProfileImage from "../assets/Images/dummyProfileImage.png";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match.", {
        theme: "dark",
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8001/api/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
        navigate("/login");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          profileImage: null,
        });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      }
    }
  };

  const handleGoogleSignup = () => {
    // Handle Gmail login logic here, e.g., redirect to OAuth flow
    console.log("Signup with Gmail clicked");
  };

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen pt-16">
      <div className="w-full max-w-lg bg-slate-800 p-8 my-4 rounded-lg shadow-md">
        <h1 className="text-[1.65rem] md:text-[1.75rem] font-semibold text-center text-white mb-4">
          Welcome to ChessMaster
        </h1>
        <h2 className="text-2xl font-semibold text-center text-green-300 mb-6">
          Register to join the game
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <label
              htmlFor="profileImage"
              className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 border border-gray-600 overflow-hidden cursor-pointer"
            >
              <img
                src={
                  formData.profileImage
                    ? URL.createObjectURL(formData.profileImage)
                    : dummyProfileImage
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <label htmlFor="username" className="block font-medium text-sm text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
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
            <label htmlFor="confirmPassword" className="block font-medium text-sm text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="mx-4 text-white">or</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>
        <div className="flex justify-center items-center font-medium gap-x-2 mt-6 w-full py-2 px-4 bg-slate-950 hover:bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
             onClick={handleGoogleSignup}>
          <FcGoogle />
          <span className="text-white">Continue with Google</span>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
