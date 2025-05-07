import React from "react";
import LayoutProps from "../types/layout/Layout";
import Sidebar from "../components/navigation/Sidebar";

const CompanyLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="mx-auto my-4 p-4 min-w-7xl">
        <h1 className="text-3xl font-extrabold mb-4">Vacancy</h1>
        {children}
      </div>
    </div>
  );
};

export default CompanyLayout;
