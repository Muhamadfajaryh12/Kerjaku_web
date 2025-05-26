"use client";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { MdDashboard, MdSettings, MdWork } from "react-icons/md";
import Cookies from "js-cookie";
const dataLink = [
  {
    link: "/admin/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    link: "/admin/vacancy",
    name: "Vacancy",
    icon: <MdWork />,
  },
  {
    link: "/admin/company",
    name: "Company",
    icon: <MdSettings />,
  },
];

const Sidebar = () => {
  const path = usePathname();
  const result = path.split("/").filter((segment) => segment !== "");
  const router = useRouter();
  const Logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("id");
    localStorage.removeItem("id_company");
    localStorage.removeItem("id_profile");
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen shadow-md">
      <Flex
        direction="column"
        justifyContent="space-between"
        height="full"
        mt="5"
      >
        <Stack>
          {dataLink.map((item) => (
            <Box
              key={item.link}
              p="3"
              className={`p-4 my-2 text-md hover:bg-black hover:text-white ${
                result[1] == item.name.toLocaleLowerCase()
                  ? "bg-black text-white"
                  : ""
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
          <Button w="full" onClick={() => Logout()}>
            <Flex alignItems="center" gap="3">
              <BiLogOut /> <Text fontWeight="semibold">Logout</Text>
            </Flex>
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Sidebar;
