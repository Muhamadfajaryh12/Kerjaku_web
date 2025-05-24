"use client";
import ExperienceCard from "@/components/card/ExperienceCard";
import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import ExperienceAPI from "@/services/ExperienceAPI";
import {
  Box,
  Breadcrumb,
  Flex,
  Image,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaLocationDot, FaMessage, FaPencil, FaPhone } from "react-icons/fa6";

const ProfilePage = () => {
  const params = useParams();

  const { data, setData } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/profile/${params.id}`
  );

  const deleteExperience = async (id: number) => {
    const response = await ExperienceAPI.DeleteExperience(id);
    console.log(response);
    if (response?.status == 200) {
      toaster.create({
        title: response.message,
        type: "success",
      });
      setData((prevData) => ({
        ...prevData,
        data: {
          ...prevData?.data,
          experience: prevData?.experience.filter((item) => item.id !== id),
        },
      }));
    }
  };
  return (
    <MainLayout>
      <Breadcrumb.Root my="5">
        <Breadcrumb.List>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>{data?.name}</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Flex gap="6" justifyContent="center" mt="4">
        <Image
          src={`http://127.0.0.1:3000/${data?.photo}`}
          width="200px"
          height="200px"
          rounded="sm"
        />
        <Stack gap="5">
          <Stack>
            <Flex justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">
                {data?.name}
              </Text>
              <Button asChild size="xs">
                <Link href={`/profile/form/${data?.id_user}`}>
                  <FaPencil />
                </Link>
              </Button>
            </Flex>
            <Flex alignItems={"center"} gap="3">
              <FaLocationDot />
              <Text>{data?.address}</Text>
            </Flex>
            <Flex alignItems={"center"} gap="3">
              <FaMessage />
              <Text>{data?.email}</Text>
            </Flex>
            <Flex alignItems={"center"} gap="3">
              <FaPhone />
              <Text>{data?.phone}</Text>
            </Flex>
          </Stack>
          <Stack gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Summary
            </Text>
            <Box rounded="sm" borderWidth="1px" p="4">
              <Text>{data?.summary}</Text>
            </Box>
          </Stack>
          <Stack gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Experience
            </Text>
            {data?.experience?.map((item, index) => (
              <ExperienceCard
                data={item}
                onDelete={deleteExperience}
                key={index}
              />
            ))}
            <Button asChild variant="surface">
              <Link href="/profile/experience/form"> Add Experience</Link>
            </Button>
          </Stack>
          <Stack gap="2">
            <Text fontSize="xl" fontWeight="bold">
              Circulum Vitae
            </Text>
            <Box rounded="sm" borderWidth="1px" p="4">
              <Flex alignItems={"center"} gap="2">
                <BiSolidFilePdf color="red" size={20} />
                <Text>{data?.cv}</Text>
              </Flex>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </MainLayout>
  );
};

export default ProfilePage;
