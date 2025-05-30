"use client";
import React from "react";
import LayoutProps from "../types/layout/Layout";
import Sidebar from "../components/navigation/Sidebar";
import { Box, Breadcrumb, Container, Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const CompanyLayout = ({ title, children }: LayoutProps) => {
  const path = usePathname();
  const result = path.split("/").filter((segment) => segment !== "");
  if (title) {
    result.push(title);
  }
  return (
    <Flex>
      <Sidebar />
      <Box width="full">
        <Box width="full" p="4" borderBottomWidth="1px">
          <Breadcrumb.Root>
            <Breadcrumb.List>
              {result?.map((item, index) => (
                <React.Fragment key={index}>
                  <Breadcrumb.Item
                    fontWeight="semibold"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item}
                  </Breadcrumb.Item>
                  {index < result.length - 1 && <Breadcrumb.Separator />}
                </React.Fragment>
              ))}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Box>
        <Container p="5" backgroundColor="gray.100" h="full">
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default CompanyLayout;
