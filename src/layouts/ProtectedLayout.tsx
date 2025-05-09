import Navbar from "@/components/navigation/Navbar";
import React from "react";

const ProtectedLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="m-2 p-2 ">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
