import React, { useContext } from "react";
import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ScrollToTop from "../components/ScrollToTop";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const { initialLoading } = useContext(AuthContext);
  if (initialLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf0ca]">
      <ScrollToTop />
      <header className="">
        <Navbar />
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
