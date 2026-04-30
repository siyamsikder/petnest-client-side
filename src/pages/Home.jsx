import React, { useEffect } from "react";

import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import RecentListings from "./RecentListings";
import WhyAdoptFromPetNest from "./WhyAdoptFromPetNest";
import MeetOurPetHeroes from "./MeetOurPetHeroes";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import Newsletter from "./Newsletter";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <section>
        <HeroSection />
      </section>
      <section>
        <CategorySection />
      </section>
      <section>
        <HowItWorks />
      </section>
      <section>
        <RecentListings />
      </section>
      <section>
        <WhyAdoptFromPetNest />
      </section>
      <section>
        <MeetOurPetHeroes />
      </section>
      <section>
        <FAQ />
      </section>
      <section>
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;
