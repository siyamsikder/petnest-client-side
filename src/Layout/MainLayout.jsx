import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loder from "../components/Loder";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  if (loading) return <Loder />;

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
