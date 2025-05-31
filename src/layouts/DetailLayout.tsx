import Navbar from "@/components/navigation/Navbar";
import LayoutProps from "@/types/layout/Layout";
import React from "react";

const DetailLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default DetailLayout;
