import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTag,
  FaEnvelope,
  FaDog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const ProductDetailsPage = () => {
  const listing = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const order = {
      buyerName: form.name.value,
      email: user?.email,
      productId: listing._id,
      productName: listing.name,
      quantity: listing.category.includes("Pet") ? 1 : form.quantity.value,
      price: listing.price || "Free for Adoption",
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
    };

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("🐾 Order placed successfully!");
        setShowModal(false);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 text-gray-800">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative group">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-[480px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500"
          />
          <span className="absolute bottom-4 left-4 bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold text-sm shadow">
            {listing.category}
          </span>
        </div>
        <div className="space-y-5">
          <h1 className="text-4xl font-extrabold text-primary gap-2">
            {listing.name}
          </h1>
          <p className="flex items-center gap-2 text-lg text-gray-700">
            <FaTag className="text-yellow-500" /> Category:{" "}
            <span className="font-semibold">{listing.category}</span>
          </p>

          <p className="flex items-center gap-2 text-lg text-gray-700">
            <FaMoneyBillWave className="text-green-500" /> Price:{" "}
            <span className="font-semibold">
              {listing.price || "Free for Adoption"}
            </span>
          </p>

          <p className="flex items-center gap-2 text-lg text-gray-700">
            <FaMapMarkerAlt className="text-red-500" /> Location:{" "}
            <span className="font-semibold">{listing.location}</span>
          </p>

          <p className="flex items-center gap-2 text-lg text-gray-700">
            <FaEnvelope className="text-blue-500" /> Owner Email:{" "}
            <span className="font-semibold">{listing.email}</span>
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed border-t pt-4">
            {listing.description}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-primary text-black font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:opacity-90 transition-all duration-300">
            🐾 Adopt / Order Now
          </button>
        </div>
      </div>
      {/* modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-white text-gray-800 rounded-2xl max-w-lg">
            <h3 className="font-bold text-2xl mb-4 text-primary text-center">
              Adopt / Order Now
            </h3>

            <form onSubmit={handleOrderSubmit} className="space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Buyer Name"
                defaultValue="Current User"
                readOnly
                className="input input-bordered w-full"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                defaultValue="user@example.com"
                readOnly
                className="input input-bordered w-full"
              />
              <input
                name="productId"
                type="text"
                value={listing._id}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                name="productName"
                type="text"
                value={listing.name}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                name="quantity"
                type="number"
                defaultValue={listing.category.includes("Pet") ? 1 : 1}
                readOnly={listing.category.includes("Pet")}
                className="input input-bordered w-full"
              />
              <input
                name="price"
                type="text"
                value={listing.price || "Free"}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                name="address"
                type="text"
                placeholder="Your Address"
                required
                className="input input-bordered w-full"
              />
              <input
                name="date"
                type="date"
                required
                className="input input-bordered w-full"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                required
                className="input input-bordered w-full"
              />
              <textarea
                name="notes"
                placeholder="Additional Notes"
                className="textarea textarea-bordered w-full"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-white hover:text-secondary text-white hover:btn-outline">
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProductDetailsPage;
