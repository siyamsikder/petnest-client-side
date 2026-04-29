import React, { useEffect } from "react";

import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import RecentListings from "./RecentListings";
import WhyAdoptFromPetNest from "./WhyAdoptFromPetNest";
import MeetOurPetHeroes from "./MeetOurPetHeroes";

const Home = () => {


  return (
    <div>
      <section>
        <HeroSection />
      </section>
      <section>
        <CategorySection />
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
    </div>
  );
};

export default Home;
