"use client";
import React, { useState } from "react";
import { Box, Button, Checkbox, Stack, Text } from "@chakra-ui/react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterKey = Object.keys(data || []);
  const [filters, setFilters] = useState({
    category: [] as string[],
    type: [] as string[],
    location: [] as string[],
  });

  const handleCheckboxChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const newFilters = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return {
        ...prev,
        [type]: newFilters,
      };
    });
  };

  const handleFilterSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  return (
    <Box
      borderWidth="1px"
      rounded="md"
      p="4"
      minWidth="2xs"
      backgroundColor="white"
    >
      <Stack gap="2">
        {filterKey.map((item) => (
          <div key={item}>
            <Text fontWeight="bold">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
            <Stack gap="2">
              {data[item].map((items, index) => (
                <Checkbox.Root
                  key={index}
                  onCheckedChange={() => handleCheckboxChange(item, items)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{items}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Stack>
          </div>
        ))}

        <Button width="full" size="sm" onClick={handleFilterSubmit}>
          FILTER
        </Button>
      </Stack>
    </Box>
  );
};

export default Filter;
