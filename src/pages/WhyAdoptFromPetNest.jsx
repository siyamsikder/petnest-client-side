import React from "react";

const WhyAdoptFromPetNest = () => {
  const features = [
    {
      title: "Ethical Sourcing",
      desc: "We verify every breeder and listing to ensure the highest standards of animal welfare.",
      icon: "✨",
    },
    {
      title: "Safe Payments",
      desc: "Your transactions are protected with industry-leading security protocols.",
      icon: "🛡️",
    },
    {
      title: "Community Driven",
      desc: "Join a network of passionate pet lovers dedicated to finding homes for every animal.",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Why <span className="text-primary font-classic">PetNest</span> is the best choice for you.
            </h2>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              We go beyond just listings. We provide a safe, ethical, and supportive ecosystem for pets and their future families.
            </p>
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-[40px] rotate-3 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80"
              alt="Happy pet"
              className="rounded-[40px] shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs">
              <p className="text-gray-800 font-bold mb-2">"Found my best friend here!"</p>
              <p className="text-gray-500 text-sm">- Sarah Johnson</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdoptFromPetNest;
