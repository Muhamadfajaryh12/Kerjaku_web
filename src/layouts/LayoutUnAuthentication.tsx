import Navbar from "@/components/navigation/Navbar";
import LayoutProps from "@/types/layout/Layout";
import { Container, Input, InputGroup } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const LayoutUnAuthentication = ({ children }: LayoutProps) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    <main className="bg-gray-100">
      <Navbar />
      <Container mx="auto" my="20px" p="2" minHeight="screen">
        <div className="w-full">
          <InputGroup
            startElement={<BiSearch />}
            my="4"
            backgroundColor="white"
          >
            <Input
              placeholder="Search"
              size="md"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </div>
        {children}
      </Container>
    </main>
  );
};

export default LayoutUnAuthentication;
