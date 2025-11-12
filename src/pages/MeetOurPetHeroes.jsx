import React from "react";
import { FaHeart, FaPaw } from "react-icons/fa";

const MeetOurPetHeroes = () => {
  const heroes = [
    {
      name: "Tamanna",
      role: "Adopted Bella the Golden Retriever",
      image:
        "https://i.ibb.co.com/ycfZn3DN/amin-alizadeh-OZw-RQi-6jo-U-unsplash.jpg",
      quote:
        "Adopting from PetNest changed my life — Bella brought endless joy and unconditional love to our home.",
    },
    {
      name: "Rahim Uddin",
      role: "Rescued street cats through PetNest",
      image:
        "https://i.ibb.co.com/v4vNfKt9/ag-juwel-Icj-PU3-QH5-U-unsplash.jpg",
      quote:
        "PetNest helped me find families for three rescued kittens. It’s more than a site — it’s a movement of compassion.",
    },
    {
      name: "Emily Carter",
      role: "Volunteer & Foster Caregiver",
      image:
        "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=400&q=80",
      quote:
        "Every foster story has a happy ending here. I’ve watched pets find homes and hearts full of love.",
    },
    {
      name: "Jahid Hasan",
      role: "Adopted Coco the Parrot",
      image:
        "https://i.ibb.co.com/fdmVt5Fq/jonatas-domingos-zk-LCZce-K0v-U-unsplash.jpg",
      quote:
        "Coco talks, sings, and brightens every morning. PetNest made the process easy and caring from start to finish.",
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
          Every adoption has a story of love, care, and second chances. 
          These heroes opened their hearts — and changed lives forever.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {heroes.map((hero, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:-translate-y-2 transition transform hover:shadow-2xl border-t-4 border-yellow-400"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {hero.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{hero.role}</p>
                <p className="text-gray-600 text-sm italic">“{hero.quote}”</p>
                <div className="flex items-center mt-4 text-yellow-400">
                  <FaHeart className="mr-1" /> <FaPaw />
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
