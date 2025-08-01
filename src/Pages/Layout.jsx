import React from "react";
import { Outlet } from "react-router-dom";
import topBanner from "../assets/cardtop.png";
import bottomBanner from "../assets/cardbottom.png";

const Layout = () => {
  return (
    <div className=" flex flex-col  text-white max-h-screen ">
      {/* Top Banner Image */}
      <img
        src={topBanner}
        alt="Top Banner"
        className="w-full h-25 object-cover"
      />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center h-auto p-4">
        <Outlet />
      </main>

      {/* Bottom Banner Image */}
      <img
        src={bottomBanner}
        alt="Bottom Banner"
        className="w-full h-25 object-cover"
      />
    </div>
  );
};

export default Layout;
