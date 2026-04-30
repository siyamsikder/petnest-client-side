import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const AddListing = ({ onNewListing }) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      price: formData.category === "Pets" ? 0 : Number(formData.price),
      created_at: new Date(),
    };

    try {
      const token = localStorage.getItem('access-token');
      const res = await fetch("https://petnest-one.vercel.app/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error("Failed to add listing");

      const result = await res.json();
      toast.success("🐾 Listing added successfully!");

      setFormData({
        name: "",
        category: "Pets",
        price: "",
        location: "",
        description: "",
        image: "",
        date: "",
        email: user?.email || "",
      });

      onNewListing?.(result);
    } catch (error) {
      toast.error("❌ Failed to add listing");
    }
  };

  return (
    <section className="bg-[#fcf0ca] min-h-screen py-16">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          🐶 Add a New Listing
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="label font-semibold text-gray-700">Product / Pet Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Golden Retriever Puppy"
              required
              className="input input-bordered w-full rounded-xl bg-gray-50"
            />
          </div>
          {/* Category */}
          <div>
            <label className="label font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full rounded-xl bg-gray-50">
              <option value="Pets">Pets</option>
              <option value="Food">Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Care Products">Care Products</option>
            </select>
          </div>
          {formData.category !== "Pets" && (
            <div>
              <label className="label font-semibold text-gray-700">Price (৳)</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
                className="input input-bordered w-full rounded-xl bg-gray-50"
              />
            </div>
          )}

          {/* Location */}
          <div>
            <label className="label font-semibold text-gray-700">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Dhaka, Bangladesh"
              required
              className="input input-bordered w-full rounded-xl bg-gray-50"
            />
          </div>

          {/* Image */}
          <div>
            <label className="label font-semibold text-gray-700">Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              required
              className="input input-bordered w-full rounded-xl bg-gray-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your pet or product..."
              required
              rows={4}
              className="textarea textarea-bordered w-full rounded-xl bg-gray-50"
            />
          </div>

          {/* Pick Up Date */}
          <div>
            <label className="label font-semibold text-gray-700">Pick Up Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input input-bordered w-full rounded-xl bg-gray-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label font-semibold text-gray-700">Your Email</label>
            <input
              name="email"
              value={formData.email}
              readOnly
              className="input input-bordered w-full rounded-xl bg-gray-200 text-gray-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-6 text-white font-semibold text-lg rounded-xl shadow-md hover:shadow-lg transition hover:scale-[1.02]">
            Add Listing
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddListing;
