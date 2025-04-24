import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../Redux-Store/slices/loggedUserSlice.jsx'; // Adjust the path to your slice
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, profileImage } = useSelector((state) => state.loggedUser);

    console.log(email);

    const [newProfile, setNewProfile] = useState({
        newProfileImage: null,
        currentPassword: '',
        newPassword: '',
    })
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleProfileUpdate = (e) => {
        const { name, value, files, type } = e.target;
        setNewProfile({
            ...newProfile,
            [name]: type === "file" ? files[0] : value,
        })
    };

    const handleSaveChanges = async () => {

        if (!newProfile.newProfileImage && !newProfile.currentPassword && !newProfile.newPassword) {
            toast.warn("Please update either Profile Image or Password", {
                theme: "dark",
                autoClose: 1000,
                pauseOnHover: false,
                position: "bottom-right",
            });
            return;
        }

        if ((newProfile.currentPassword && !newProfile.newPassword) || (!newProfile.currentPassword && newProfile.newPassword)) {
            toast.warn("Please provide both current and new passwords.", {
                theme: "dark",
                autoClose: 1000,
                pauseOnHover: false,
                position: "bottom-right",
            });
            return;
        }
        const formData = new FormData();
        if (newProfile.newProfileImage) {
            formData.append('newProfileImage', newProfile.newProfileImage); // Append the file
        }
        if (newProfile.currentPassword) {
            formData.append('currentPassword', newProfile.currentPassword); // Append the current password
        }
        if (newProfile.newPassword) {
            formData.append('newPassword', newProfile.newPassword); // Append the new password
        }

        setLoading(true);

        try {
            const res = await axios.patch(`http://localhost:8001/api/user/edit-profile`, formData, {
                withCredentials: true,
                // headers: {
                //     "Content-Type": "multipart/form-data",      // no need to set header, axios will automatically set it to `multipart/form-data` when using FormData (but need to set header if using newProfile directly )
                // },
            });

            if (res.data.success) {
                toast.success("Profile updated successfully.", {
                    theme: "dark",
                    autoClose: 1000,
                    pauseOnHover: false,
                    position: "bottom-right",
                });
                const profileImage = res.data.profileImage;
                if(newProfile.newProfileImage){
                    dispatch(updateProfile({ profileImage }));
                }
                navigate('/profile');
            }
        } catch (error) {
            toast.error('Error updating profile. Please try again later.', {
                theme: 'dark',
                autoClose: 1000,
                pauseOnHover: false,
                position: 'bottom-right',
            });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-700 flex items-center justify-center pt-16">
            <div className="bg-slate-800 shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-center text-3xl font-bold text-white">Edit Profile</h2>
                <p className="text-center text-gray-400 text-sm mt-2">Update your profile information below and click 'Save Changes' when you're done.</p>

                {/* Profile Image */}
                <div className="mt-6">
                    <label htmlFor="profileImage" className="block text-gray-300 mb-2">Profile Image</label>
                    <input
                        type="file"
                        name='newProfileImage'
                        id="profileImage"
                        accept="image/*"
                        onChange={handleProfileUpdate}
                        className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                </div>

                {/* Change Password */}
                <div className="mt-6">
                    <label className="block text-gray-300 mb-2">Change Password</label>
                    <input
                        type="password"
                        name='currentPassword'
                        placeholder="Current Password"
                        className="w-full bg-slate-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={newProfile.currentPassword}
                        onChange={handleProfileUpdate}
                        onFocus={() => setShowNewPassword(true)}
                    />
                </div>

                {showNewPassword && (
                    <div className="mt-4">
                        <input
                            type="password"
                            name='newPassword'
                            placeholder="New Password"
                            className="w-full bg-slate-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={newProfile.newPassword}
                            onChange={handleProfileUpdate}
                        />
                    </div>
                )}

                {/* Back to Profile */}
                <div className="mt-6 flex justify-between">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-all duration-300"
                        onClick={() => navigate('/profile')}
                    >
                        Back to Profile
                    </button>
                    <button
                        className={`bg-blue-600 text-white py-2 px-6 rounded-full font-semibold tracking-wider shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleSaveChanges}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
