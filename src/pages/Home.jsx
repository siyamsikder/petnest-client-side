import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import RecentListings from "./RecentListings";
import WhyAdoptFromPetNest from "./WhyAdoptFromPetNest";
import MeetOurPetHeroes from "./MeetOurPetHeroes";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,  
      mirrir:true,
      // easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <section data-aos="fade-up">
        <HeroSection />
      </section>

      <section data-aos="zoom-in-down">
        <CategorySection />
      </section>

      <section data-aos="zoom-in-down">
        <RecentListings />
      </section>

      <section data-aos="zoom-in">
        <WhyAdoptFromPetNest />
      </section>

      <section data-aos="fade-up">
        <MeetOurPetHeroes />
      </section>
    </div>
  );
};

export default Home;
