import React from 'react';
import { FaUserPlus, FaSearch, FaHeart } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create an Account",
      description: "Join our community of pet lovers to start your journey of finding a new companion.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <FaSearch />,
      title: "Find Your Match",
      description: "Browse through hundreds of verified listings and filter by category, location, or price.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: <FaHeart />,
      title: "Adopt & Love",
      description: "Connect with owners, visit your future pet, and complete the adoption process.",
      color: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How PetNest <span className="text-primary font-classic">Works</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Adopting a pet should be a joyful experience. We've simplified the process into three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (visible on md+) */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gray-100 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {step.description}
              </p>
              <div className="mt-8 text-primary font-bold text-lg opacity-20 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
