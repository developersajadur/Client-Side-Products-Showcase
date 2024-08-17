import React from "react";
import Header from "../Pages/Shared/Navbar";
import Shop from "../Pages/Shop/Shop";
import { Toaster } from "react-hot-toast";
import Footer from "../Pages/Shared/Footer";

const Root = () => {
  return (
    <div className="bg-[F7F9F2]">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Shop />
      <Footer/>
    </div>
  );
};

export default Root;
