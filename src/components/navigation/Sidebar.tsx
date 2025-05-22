"use client";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { MdDashboard, MdSettings, MdWork } from "react-icons/md";

const dataLink = [
  {
    link: "/company/admin",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    link: "/company/admin/vacancy",
    name: "Vacancy",
    icon: <MdWork />,
  },
  {
    link: "/company/admin/profile",
    name: "Profile",
    icon: <MdSettings />,
  },
];

const Sidebar = () => {
  const router = usePathname();

  return (
    <div className="w-48 h-screen shadow-md">
      <Flex direction="column" justifyContent="space-between" height="full">
        <Stack gap="3">
          {dataLink.map((item) => (
            <Box
              key={item.link}
              p="2"
              className={`p-4 my-2 text-md hover:bg-black hover:text-white ${
                router == item.link ? "bg-black text-white" : ""
              }`}
            >
              <Link href={item.link}>
                <div className="flex items-center gap-4">
                  {item.icon} <p>{item.name}</p>
                </div>
              </Link>
            </Box>
          ))}
        </Stack>
        <Box p="2" mb="10">
          <Flex alignItems="center" gap="4">
            <BiLogOut /> <Text fontWeight="semibold">Logout</Text>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Sidebar;
