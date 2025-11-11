import React from "react";
import { FaHeart, FaPaw, FaHandshake, FaHome } from "react-icons/fa";

const WhyAdoptFromPetNest = () => {
  const features = [
    {
      icon: <FaHeart className="text-primary text-4xl" />,
      title: "Give Love a Home",
      description:
        "Every adoption creates a loving bond. At PetNest, we help you give a pet the second chance they deserve.",
    },
    {
      icon: <FaPaw className="text-yellow-400 text-4xl" />,
      title: "Trusted Listings",
      description:
        "All pets and sellers on our platform are verified to ensure safety, trust, and happy adoptions.",
    },
    {
      icon: <FaHandshake className="text-yellow-400 text-4xl" />,
      title: "Community Connection",
      description:
        "Join a caring community of pet lovers. Share stories, learn tips, and make connections that last a lifetime.",
    },
    {
      icon: <FaHome className="text-yellow-400 text-4xl" />,
      title: "Safe Forever Homes",
      description:
        "We work to ensure every pet finds a safe, comfortable, and happy forever home — because they deserve it.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#FFF7D0] via-[#FFF9E8] to-[#FFFBEF] py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🐕 Why Adopt from <span className="text-yellow-400">PetNest?</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          PetNest isn’t just a platform — it’s a family. We connect loving
          owners with pets who need a home. Together, we make adoption joyful,
          easy, and meaningful.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 transition hover:-translate-y-2 hover:shadow-2xl border-t-4 border-yellow-400">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdoptFromPetNest;
