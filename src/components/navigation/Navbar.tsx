"use client";
import {
  InputGroup,
  Input,
  Text,
  Flex,
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Cookies from "js-cookie";

const Navbar = () => {
  const auth = Cookies.get("token");
  const [keyword, setKeyword] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };
  return (
    <Flex borderWidth="1px" justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize="2xl" mx="2">
        KerjaKu
      </Text>
      <div className="min-w-lg max-w-xl p-6">
        <InputGroup startElement={<BiSearch />} p="2">
          <Input
            placeholder="Search"
            size="md"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </div>
      {auth ? (
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
                  <Link href="">Lamaran Pekerjaan</Link>
                </Menu.Item>
                <Menu.Item value="new-txt-c">
                  <Link href="">Logout</Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <Flex gap="2">
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
