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
        <Link href="/" className="border-4 border-blue-700">
          Vacancy
        </Link>
        <Link href="/company">Company</Link>
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
                    <Link href={`/apply/${id_profile}`}>Lamaran Pekerjaan</Link>
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
            <Link href={`/admin`}>
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
