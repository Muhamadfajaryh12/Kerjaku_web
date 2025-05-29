import React from "react";
import LayoutProps from "../types/layout/Layout";

const AuthenticationLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      {children}
    </div>
  );
};

export default AuthenticationLayout;
