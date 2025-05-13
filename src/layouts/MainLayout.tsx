import Navbar from "@/components/navigation/Navbar";
import LayoutProps from "@/types/layout/Layout";
import { Box, Container } from "@chakra-ui/react";
import React from "react";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <Container mx="auto" my="20px">
        {/* <Box borderWidth="1px" borderRadius="md"> */}
        {children}
        {/* </Box> */}
      </Container>
    </div>
  );
};

export default MainLayout;
