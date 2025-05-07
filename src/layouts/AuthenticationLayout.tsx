import React from "react";
import LayoutProps from "../app/types/layout/Layout";

const AuthenticationLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {children}
    </div>
  );
};

export default AuthenticationLayout;
