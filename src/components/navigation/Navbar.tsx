"use client";
import { Text, Flex, Button, Menu, Portal } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const auth = Cookies.get("token");
  const id = localStorage.getItem("id");
  const router = useRouter();
  const Logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("id");
    router.push("/login");
  };
  return (
    <Flex borderWidth="1px" justifyContent="space-around" alignItems="center">
      <Flex gap="4" alignItems="center">
        <Text fontWeight="bold" fontSize="2xl" mx="2">
          KerjaKu
        </Text>
        <Link href="/">Vacancy</Link>
        <Link href="/">Company</Link>
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
                    <Link href="">Profile</Link>
                  </Menu.Item>
                  <Menu.Item value="new-txt-b">
                    <Link href={`/apply/${id}`}>Lamaran Pekerjaan</Link>
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
            <Link href="/">
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
