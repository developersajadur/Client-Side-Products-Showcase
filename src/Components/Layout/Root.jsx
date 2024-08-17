import React from "react";
import Header from "../Pages/Shared/Navbar";
import Shop from "../Pages/Shop/Shop";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="bg-[F7F9F2]">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Shop />
    </div>
  );
};

export default Root;
