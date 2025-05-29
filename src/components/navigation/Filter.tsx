"use client";
import React, { useState } from "react";
import { Box, Button, Checkbox, Stack } from "@chakra-ui/react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/category`);

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
        <p>Category</p>
        <Stack gap="2">
          {data?.category?.map((item, index) => (
            <Checkbox.Root
              key={index}
              onCheckedChange={() => handleCheckboxChange("category", item)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{item}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Stack>
        <p>Type</p>
        <Stack gap="2">
          {data?.type?.map((item, index) => (
            <Checkbox.Root
              key={index}
              onCheckedChange={() => handleCheckboxChange("type", item)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{item}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Stack>
        <p>Location</p>
        <Stack gap="2">
          {data?.location?.map((item, index) => (
            <Checkbox.Root
              key={index}
              onCheckedChange={() => handleCheckboxChange("location", item)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{item}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Stack>
        <Button width="full" size="sm" onClick={handleFilterSubmit}>
          FILTER
        </Button>
      </Stack>
    </Box>
  );
};

export default Filter;
