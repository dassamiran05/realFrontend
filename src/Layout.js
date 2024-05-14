import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <div className="py-4 px-8 relative">
        <Header />
        <div className="mt-[76px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
