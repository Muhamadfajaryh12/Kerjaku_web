"use client";
import ExperienceCard from "@/components/card/ExperienceCard";
import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import ApplicationAPI from "@/services/ApplicationAPI";
import {
  Box,
  Breadcrumb,
  Button,
  CloseButton,
  Field,
  FileUpload,
  Flex,
  Input,
  InputGroup,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidFilePdf } from "react-icons/bi";
import { LuFileUp } from "react-icons/lu";

const FormApplicationVacancyPage = () => {
  const params = useParams();
  const idUser = localStorage.getItem("id");
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/profile/${idUser}`);

  const [coverLetter, setCoverLetter] = useState<File | null>();
  const handleCoverLetter = (data: File) => {
    if (data) {
      setCoverLetter(data);
    }
  };

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    reset({
      name: data?.data?.name,
      summary: data?.data?.summary,
      email: data?.data?.email,
      phone: data?.data?.phone,
      address: data?.data?.address,
      education: data?.data?.education,
    });
  }, [data, reset]);

  const submitApplication = async () => {
    const formData = new FormData();
    formData.append("cover_letter", coverLetter);
    formData.append("id_user", idUser);
    formData.append("id_vacancy", params.id);

    const response = await ApplicationAPI.InsertApplication({
      formData: formData,
    });

    if (response?.status == 201) {
      toaster.create({
        title: response?.message,
        type: "success",
      });
    }
    console.log(response);
  };
  return (
    <MainLayout>
      <div>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>Vacancy</Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>Application</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <form onSubmit={handleSubmit(submitApplication)} className="mt-10">
          <Tabs.Root defaultValue="biodata" variant="line">
            <Tabs.List>
              <Tabs.Trigger value="biodata">Biodata</Tabs.Trigger>
              <Tabs.Trigger value="experience">Experience</Tabs.Trigger>
              <Tabs.Trigger value="file">File</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="biodata">
              <Stack gap="2">
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input {...register("name")} size="md" disabled />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Summary</Field.Label>
                  <Input {...register("summary")} size="md" disabled />
                </Field.Root>
                <Flex gap="2">
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("email")} size="md" disabled />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Phone</Field.Label>
                    <Input {...register("phone")} size="md" disabled />
                  </Field.Root>
                </Flex>
                <Flex>
                  <Field.Root>
                    <Field.Label>Address</Field.Label>
                    <Input {...register("address")} size="md" disabled />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Education</Field.Label>
                    <Input {...register("education")} size="md" disabled />
                  </Field.Root>
                </Flex>
              </Stack>
            </Tabs.Content>
            <Tabs.Content value="experience">
              {data?.data?.experience.map((item, index) => (
                <ExperienceCard data={item} key={index} />
              ))}
            </Tabs.Content>
            <Tabs.Content value="file">
              <Stack gap="2">
                <div>
                  <Text fontSize="sm">Circulum Vitae</Text>
                  <Box rounded="sm" borderWidth="1px" p="4">
                    <Flex alignItems={"center"} gap="2">
                      <BiSolidFilePdf color="red" size={20} />
                      <Text>{data?.data?.cv}</Text>
                    </Flex>
                  </Box>
                </div>
                <FileUpload.Root
                  gap="1"
                  onChange={(e) => handleCoverLetter(e.target?.files[0])}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Label>Circulum Vitae</FileUpload.Label>
                  <InputGroup
                    startElement={<LuFileUp />}
                    endElement={
                      <FileUpload.ClearTrigger asChild>
                        <CloseButton
                          me="-1"
                          size="xs"
                          variant="plain"
                          focusVisibleRing="inside"
                          focusRingWidth="2px"
                          pointerEvents="auto"
                        />
                      </FileUpload.ClearTrigger>
                    }
                  >
                    <Input asChild>
                      <FileUpload.Trigger>
                        <FileUpload.FileText lineClamp={1} />
                      </FileUpload.Trigger>
                    </Input>
                  </InputGroup>
                </FileUpload.Root>
                <Button type="submit">Submit</Button>
              </Stack>
            </Tabs.Content>
          </Tabs.Root>
        </form>
      </div>
    </MainLayout>
  );
};

export default FormApplicationVacancyPage;
