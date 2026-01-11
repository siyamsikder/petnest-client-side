import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf0ca]">
      <header className="">
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
