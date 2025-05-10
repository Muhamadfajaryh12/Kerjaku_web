import Navbar from "@/components/navigation/Navbar";
import LayoutProps from "@/types/layout/Layout";
import React from "react";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="m-2 p-2 ">{children}</div>
    </div>
  );
};

export default MainLayout;
