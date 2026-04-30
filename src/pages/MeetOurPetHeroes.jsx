import React from "react";
import { FaHeart, FaPaw } from "react-icons/fa";

const MeetOurPetHeroes = () => {
  const heroes = [
    {
      name: "Bella & Max",
      story: "Bella was rescued from the streets and found her forever home with Max in just 3 days!",
      img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Charlie the Retriever",
      story: "Charlie's rehoming was seamless, and he's now the heart of a loving family in Dhaka.",
      img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Luna the Cat",
      story: "Luna found a quiet home where she can sunbathe all day. Another PetNest success story!",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-primary font-classic">Success</span> Stories
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every adoption is a journey of love. Read about some of the beautiful bonds formed through PetNest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {heroes.map((hero, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={hero.img}
                  alt={hero.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary">
                  <FaHeart />
                </div>
              </div>
              <div className="p-8 text-center">
                <div className="flex justify-center gap-1 text-primary/30 mb-4">
                  <FaPaw /> <FaPaw /> <FaPaw />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{hero.name}</h3>
                <p className="text-gray-500 italic leading-relaxed">"{hero.story}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPetHeroes;
