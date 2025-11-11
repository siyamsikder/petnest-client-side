import React from "react";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import WhyAdoptFromPetNest from "./WhyAdoptFromPetNest";
import MeetOurPetHeroes from "./MeetOurPetHeroes";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection/>
      <WhyAdoptFromPetNest/>
      <MeetOurPetHeroes/>
    </div>
  );
};

export default Home;
