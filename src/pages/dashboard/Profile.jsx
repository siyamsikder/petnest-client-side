import React, { useContext, useEffect, useState } from 'react';
import { MdCameraAlt, MdMail, MdPhone, MdLocationOn, MdPerson } from 'react-icons/md';
import { AuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user: authUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authUser?.email) return;
            try {
                const token = localStorage.getItem('access-token');
                const res = await fetch(`https://petnest-one.vercel.app/users/${authUser.email}`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setUserData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [authUser?.email]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const location = form.location.value;
        const bio = form.bio.value;

        const updatedInfo = { name, phone, location, bio };

        try {
            const token = localStorage.getItem('access-token');
            const res = await fetch(`https://petnest-one.vercel.app/users/${authUser.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedInfo)
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                toast.success("Profile updated successfully!");
                setUserData({ ...userData, ...updatedInfo });
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header / Banner */}
            <div className="relative h-48 bg-gradient-to-r from-primary to-yellow-300 rounded-3xl overflow-hidden shadow-sm">
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="relative group">
                        <img
                            src={userData?.photo || userData?.avatar || authUser?.photoURL || "https://i.pravatar.cc/150"}
                            alt="Avatar"
                            className="w-32 h-32 rounded-3xl border-4 border-white object-cover shadow-lg bg-white"
                        />
                        <button className="absolute bottom-2 right-2 p-2 bg-secondary text-white rounded-xl shadow-md hover:bg-black transition-colors">
                            <MdCameraAlt size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Info & Form Section */}
            <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Information Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                            <MdPerson className="text-primary" />
                            Personal Info
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <MdMail className="text-gray-400" size={18} />
                                <span className="text-gray-600">{userData?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MdPhone className="text-gray-400" size={18} />
                                <span className="text-gray-600">{userData?.phone || 'Not set'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MdLocationOn className="text-gray-400" size={18} />
                                <span className="text-gray-600">{userData?.location || 'Not set'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-secondary mb-8">Edit Profile</h3>
                        <form className="space-y-6" onSubmit={handleUpdateProfile}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={userData?.name}
                                    className="input input-bordered w-full focus:border-primary focus:outline-none bg-gray-50"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Phone</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        defaultValue={userData?.phone}
                                        placeholder="+880 1xxx-xxxxxx"
                                        className="input input-bordered w-full focus:border-primary focus:outline-none bg-gray-50"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Location</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={userData?.location}
                                        placeholder="City, Country"
                                        className="input input-bordered w-full focus:border-primary focus:outline-none bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Bio</span>
                                </label>
                                <textarea
                                    name="bio"
                                    className="textarea textarea-bordered h-32 focus:border-primary focus:outline-none bg-gray-50"
                                    placeholder="Tell us about yourself and your love for pets..."
                                    defaultValue={userData?.bio}
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="submit" className="btn btn-secondary px-10 rounded-xl hover:scale-105 transition-transform">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
