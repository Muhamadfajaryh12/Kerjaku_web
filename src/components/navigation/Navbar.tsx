"use client";
import { InputGroup, Input, Text, Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { set } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
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
      <div className="flex gap-2 items-cente">
        <Link href="/login">
          <button
            className="border-2 p-2 border-blue-500 text-xs uppercase text-blue-500 font-semibold text-center hover:bg-blue-500 hover:text-white "
            style={{ letterSpacing: "2px" }}
          >
            Login
          </button>
        </Link>
        <Link href="/register">
          <button
            className="border-2 p-2 border-gray-500 text-xs uppercase text-gray-500 font-semibold text-center"
            style={{ letterSpacing: "2px" }}
          >
            Register
          </button>
        </Link>
      </div>
    </Flex>
  );
};

export default Navbar;
