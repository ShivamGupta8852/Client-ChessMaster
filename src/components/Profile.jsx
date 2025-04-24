import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // Get user data from Redux store
  const { userName, email, profileImage } = useSelector((state) => state.loggedUser);

  const navigate = useNavigate();

  function handleEdit(){
    navigate('/edit-profile');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-700 flex items-center justify-center pt-16">
      <div className="bg-slate-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
        <div className="text-center">
          {/* Profile Image */}
          {profileImage ? (
            <img
              className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg border-4 border-blue-500"
              src={profileImage}
              alt="Profile"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-blue-600 shadow-lg text-white text-3xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="mt-4 text-3xl font-bold text-white tracking-wide drop-shadow-lg">{userName}</h2>
          <p className="text-gray-400 text-sm mt-1">{email}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-8 space-y-4 text-gray-200">
          {/* Username Field */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-3">
            <span className="font-medium">Username</span>
            <span className="font-semibold text-lg">{userName}</span>
          </div>

          {/* Email Field */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-3">
            <span className="font-medium">Email</span>
            <span className="font-semibold text-lg">{email}</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold tracking-wider shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
