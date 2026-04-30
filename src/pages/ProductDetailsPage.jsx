import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTag,
  FaEnvelope,
  FaDog,
  FaArrowLeft,
  FaCalendarAlt,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import API_BASE_URL from "../config/api";

const ProductDetailsPage = () => {
  const loaderData = useLoaderData();
  
  // Unwrap listing from potential array or nested object (handles common API patterns)
  const listing = Array.isArray(loaderData) 
    ? loaderData[0] 
    : (loaderData?.data || loaderData?.listing || loaderData?.product || loaderData);

  const [showModal, setShowModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle case where loader might return an error or empty data
  if (!listing || (typeof listing === 'object' && Object.keys(listing).length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb]">
        <div className="text-center p-12 bg-white rounded-[40px] shadow-xl border border-gray-100 max-w-2xl">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <FaDog className="text-4xl animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pet Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">We couldn't find the details for this companion. It might have been adopted already!</p>
          <Link to="/pets-supplies" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-primary transition-all">
            Back to All Pets
          </Link>
        </div>
      </div>
    );
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const order = {
      buyerName: form.name.value,
      email: user?.email,
      productId: listing._id,
      productName: listing.name || "Unnamed Companion",
      quantity: listing.category?.includes("Pet") ? 1 : (form.quantity?.value || 1),
      price: listing.price || "Free for Adoption",
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
    };

    fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("🐾 Request submitted successfully!");
        setShowModal(false);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <section className="bg-gray-50 min-h-screen pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-95"
            >
              <FaArrowLeft />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Pet Directory</span>
              <h2 className="text-sm font-bold text-gray-900">Pet Profiles / {listing.name || "Details"}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              <FaShareAlt className="text-primary" /> Share
            </button>
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border rounded-2xl text-sm font-bold transition-all shadow-sm ${
                isWishlisted 
                ? "bg-rose-50 border-rose-100 text-rose-500" 
                : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {isWishlisted ? <FaHeart className="animate-ping-once" /> : <FaRegHeart />} Favorite
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden group">
              <img
                src={listing.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop"}
                alt={listing.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Image Badges */}
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <span className="px-6 py-2.5 bg-white/90 backdrop-blur-xl text-gray-900 text-xs font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                  {listing.category || "General"}
                </span>
                {(!listing.price || listing.price === 0) && (
                  <span className="px-6 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2">
                    <FaCheckCircle /> Available for Adoption
                  </span>
                )}
              </div>
              
              <div className="absolute bottom-10 left-10 right-10 flex gap-4 bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                 <div className="flex -space-x-3 overflow-hidden">
                    {[1,2,3,4].map(i => (
                      <img key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white/30 object-cover" src={`https://i.pravatar.cc/150?u=${listing._id + i}`} alt="" />
                    ))}
                 </div>
                 <p className="text-white text-xs font-medium self-center">Many users are viewing this pet right now!</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-20 flex flex-col">
              <div className="mb-10">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                  <span className="w-8 h-[2px] bg-primary"></span> Verified Listing
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  {listing.name || "Adorable Companion"}
                </h1>
                
                <div className="flex flex-wrap items-center gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price / Fee</p>
                    <p className="text-4xl font-black text-gray-900">
                      {listing.price ? `৳${listing.price}` : <span className="text-primary">Free</span>}
                    </p>
                  </div>
                  <div className="w-[1px] h-12 bg-gray-100 hidden md:block"></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                      <FaMapMarkerAlt className="text-primary" /> {listing.location || "Dhaka, BD"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Added Date</p>
                    <p className="text-gray-900 font-bold text-sm">{listing.date || "Today"}</p>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100">
                    <FaTag />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Category</p>
                    <p className="text-gray-900 font-bold text-sm">{listing.category || "Pet"}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About this companion</h3>
                <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                    <p className="text-gray-600 leading-relaxed text-lg italic pl-4">
                      "{listing.description || "Waiting for a loving home to become their best friend forever. This companion is healthy, friendly, and looking for a responsible owner who can provide care and affection."}"
                    </p>
                </div>
              </div>

              {/* Owner Card */}
              <div className="flex items-center justify-between p-6 bg-gray-900 rounded-[32px] mb-10 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/5 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${listing.email || 'Owner'}&background=fbbf24&color=fff`} alt="Owner" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Owner Contact</p>
                    <p className="text-white font-bold text-sm">{listing.email || "Contact for info"}</p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all cursor-pointer"><FaEnvelope /></div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full py-6 bg-primary text-white rounded-[24px] font-black text-xl hover:bg-gray-900 transition-all shadow-2xl shadow-primary/20 hover:shadow-gray-900/20 flex items-center justify-center gap-4 group active:scale-[0.98]">
                Adopt / Order Now <FaDog className="text-2xl transition-transform group-hover:scale-125" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" onClick={() => setShowModal(false)}></div>
          
          <div className="relative bg-white text-gray-900 rounded-[40px] md:rounded-[56px] p-8 md:p-16 max-w-5xl w-full border border-gray-100 shadow-3xl overflow-y-auto max-h-[95vh] animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all z-10"
            >
              ✕
            </button>

            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 font-classic">Secure Process</span>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Final Step</h3>
                  <p className="text-gray-500 text-lg">Provide your details to start the adoption or purchase process for <span className="text-gray-900 font-bold">{listing.name || 'this pet'}</span>.</p>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100"><FaCheckCircle /></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Direct Contact</p>
                        <p className="text-xs text-gray-500">We'll connect you with the owner</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-gray-100"><FaCheckCircle /></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Safe Delivery</p>
                        <p className="text-xs text-gray-500">Scheduled pickup available</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control col-span-1">
                    <label className="label mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</span></label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={user?.displayName || ""}
                      placeholder="Your Name"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="form-control col-span-1">
                    <label className="label mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</span></label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={user?.email || ""}
                      readOnly
                      className="w-full px-6 py-4 bg-gray-100 border border-gray-100 text-gray-500 rounded-2xl cursor-not-allowed outline-none"
                    />
                  </div>
                  <div className="form-control col-span-1">
                    <label className="label mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</span></label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+880 1XXX XXXXXX"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="form-control col-span-1">
                    <label className="label mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Desired Date</span></label>
                    <input
                      name="date"
                      type="date"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="form-control col-span-2">
                    <label className="label mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</span></label>
                    <input
                      name="address"
                      type="text"
                      placeholder="Detailed Street Address, City"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="form-control col-span-2">
                    <label className="label mb-2"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Additional Notes</span></label>
                    <textarea
                      name="notes"
                      placeholder="Tell us why you want to adopt..."
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all h-32 resize-none"
                    />
                  </div>

                  <div className="col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full py-6 bg-primary text-white rounded-3xl font-bold text-xl shadow-2xl shadow-primary/30 hover:bg-gray-900 transition-all transform hover:-translate-y-1">
                      Confirm Submission
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">By submitting you agree to our pet adoption terms</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailsPage;

