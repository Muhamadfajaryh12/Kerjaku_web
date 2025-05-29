import Navbar from "@/components/navigation/Navbar";
import LayoutProps from "@/types/layout/Layout";
import { Box, Container } from "@chakra-ui/react";
import React from "react";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Container mx="auto" my="20px" p="5">
        {children}
      </Container>
    </div>
  );
};

export default MainLayout;
