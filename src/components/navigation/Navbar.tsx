"use client";
import { Text, Flex, Button, Menu, Portal } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import Link from "next/link";

const Navbar = () => {
  const path = usePathname();
  const auth = Cookies.get("token");
  const id = useLocalStorate("id");
  const id_profile = useLocalStorate("id_profile");
  const router = useRouter();

  const resultPath = path.split("/").filter((segment) => segment !== "");
  const Logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("id");
    localStorage.removeItem("id_company");
    localStorage.removeItem("id_profile");
    router.push("/login");
  };

  return (
    <Flex
      borderWidth="1px"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
    >
      <Flex gap="4" alignItems="center">
        <Text fontWeight="bold" fontSize="3xl" mx="2">
          KerjaKu
        </Text>
        <Link href="/">
          <Text
            fontWeight={`${resultPath.length == 0 || resultPath[0] == "vacancy" ? "semibold" : "light"}`}
          >
            Vacancy
          </Text>
        </Link>
        <Link href="/company">
          <Text
            fontWeight={`${resultPath[0] == "company" ? "semibold" : "light"}`}
          >
            Company
          </Text>
        </Link>
      </Flex>
      {auth ? (
        <Flex alignItems="center" gap="4" p="2">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Text>Action</Text>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-txt-a">
                    <Link href={`/profile/${id}`}>Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="new-txt-b">
                    <Link href={`/apply/${id_profile}`}>Job Applied</Link>
                  </Menu.Item>
                  <Menu.Item value="new-txt-c">
                    {/* <Link href="">Logout</Link> */}
                    <Button onClick={() => Logout()}>Logout</Button>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Button asChild variant="outline" colorPalette="blue">
            <Link href={`/admin/dashboard`}>
              <Text fontWeight="bold">To Company</Text>
            </Link>
          </Button>
        </Flex>
      ) : (
        <Flex gap="2" p="2">
          <Button asChild variant="outline" colorPalette="gray" size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" colorPalette="blue" size="sm">
            <Link href="/register">Register</Link>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
