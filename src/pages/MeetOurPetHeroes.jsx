import React from "react";
import { FaPaw, FaHeart } from "react-icons/fa";

const MeetOurPetHeroes = () => {
  const heroes = [
    {
      name: "Tamanna",
      role: "Adopted Bella the Golden Retriever",
      image: "https://i.ibb.co.com/ycfZn3DN/amin-alizadeh-OZw-RQi-6jo-U-unsplash.jpg",
      quote: "Adopting from PetNest changed my life — Bella brought endless joy and unconditional love to our home.",
    },
    {
      name: "Rahim Uddin",
      role: "Rescued street cats through PetNest",
      image: "https://i.ibb.co.com/v4vNfKt9/ag-juwel-Icj-PU3-QH5-U-unsplash.jpg",
      quote: "PetNest helped me find families for three rescued kittens. It’s more than a site — it’s a movement of compassion.",
    },
    {
      name: "Emily Carter",
      role: "Volunteer & Foster Caregiver",
      image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=400&q=80",
      quote: "Every foster story has a happy ending here. I’ve watched pets find homes and hearts full of love.",
    },
    {
      name: "Jahid Hasan",
      role: "Adopted Coco the Parrot",
      image: "https://i.ibb.co.com/fdmVt5Fq/jonatas-domingos-zk-LCZce-K0v-U-unsplash.jpg",
      quote: "Coco talks, sings, and brightens every morning. PetNest made the process easy and caring from start to finish.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#FFF9E0] via-[#FFFBEF] to-[#FFF9E8] py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          <FaPaw className="inline text-yellow-400 mr-2" />
          Meet Our <span className="text-yellow-400">Pet Heroes</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Every adoption has a story of love, care, and second chances. These heroes opened their hearts — and changed lives forever.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {heroes.map((hero, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
            >
              <div className="text-white rounded-3xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl duration-700 relative backdrop-blur-xl hover:border-white/25 overflow-hidden hover:shadow-white/5 hover:shadow-3xl w-[300px] mx-auto">
                {/* Glow effects */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div
                    style={{ animationDelay: "0.5s" }}
                    className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"
                  ></div>
                </div>

                <div className="p-6 relative z-10 text-center">
                  <div className="relative mb-6">
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-24 h-24 object-cover rounded-full border-2 border-white/30 mx-auto shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    {hero.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{hero.role}</p>
                  <p className="text-gray-300 text-sm italic mt-3">
                    “{hero.quote}”
                  </p>
                  <div className="flex justify-center mt-4 text-yellow-400 space-x-2">
                    <FaHeart /> <FaPaw />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPetHeroes;
