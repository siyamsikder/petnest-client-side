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
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
            {/* Header / Banner */}
            <div className="relative h-64 bg-gray-900 rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200/50">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute -bottom-16 left-12 flex items-end gap-8">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-[32px] p-2 bg-white shadow-2xl">
                            <img
                                src={userData?.photo || userData?.avatar || authUser?.photoURL || "https://i.ibb.co/3z5GzKk/avatar.png"}
                                alt="Avatar"
                                className="w-full h-full rounded-[24px] object-cover"
                            />
                        </div>
                        <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                            <MdCameraAlt size={22} />
                        </button>
                    </div>
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-white mb-1">{userData?.name || authUser?.displayName}</h2>
                        <p className="text-primary font-bold tracking-widest uppercase text-xs">Pet Enthusiast</p>
                    </div>
                </div>
            </div>

            {/* Profile Info & Form Section */}
            <div className="pt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Information Card */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="w-2 h-6 bg-primary rounded-full"></span>
                            Identity Details
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MdMail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Email</p>
                                    <p className="text-sm font-bold text-gray-900">{userData?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MdPhone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Phone</p>
                                    <p className="text-sm font-bold text-gray-900">{userData?.phone || 'Not provided'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MdLocationOn size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Location</p>
                                    <p className="text-sm font-bold text-gray-900">{userData?.location || 'Not set'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-[32px] text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h4 className="font-bold mb-4 relative z-10">Community Member</h4>
                        <p className="text-sm text-gray-400 relative z-10 leading-relaxed">You have been a member of PetNest since {new Date(authUser?.metadata?.creationTime).toLocaleDateString()}. Thank you for being part of our family!</p>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-10">Modify Personal Profile</h3>
                        <form className="space-y-8" onSubmit={handleUpdateProfile}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-600">Display Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={userData?.name}
                                    className="input input-bordered h-14 bg-gray-50 border-gray-100 focus:border-primary focus:bg-white rounded-2xl transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-gray-600">Contact Number</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        defaultValue={userData?.phone}
                                        placeholder="+880 1xxx-xxxxxx"
                                        className="input input-bordered h-14 bg-gray-50 border-gray-100 focus:border-primary focus:bg-white rounded-2xl transition-all font-medium"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold text-gray-600">Current Residence</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={userData?.location}
                                        placeholder="City, Country"
                                        className="input input-bordered h-14 bg-gray-50 border-gray-100 focus:border-primary focus:bg-white rounded-2xl transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-600">Personal Bio</span>
                                </label>
                                <textarea
                                    name="bio"
                                    className="textarea textarea-bordered h-40 bg-gray-50 border-gray-100 focus:border-primary focus:bg-white rounded-2xl transition-all font-medium pt-4"
                                    placeholder="Share your experience with pets..."
                                    defaultValue={userData?.bio}
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button type="submit" className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-gray-900/10 hover:shadow-primary/20 active:scale-95">
                                    Update My Profile
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
