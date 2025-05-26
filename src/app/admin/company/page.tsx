"use client";

import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import CompanyLayout from "@/layouts/CompanyLayout";
import CompanyAPI from "@/services/CompanyAPI";
import { indonesianCities, typeCompanyData } from "@/utils/data";
import {
  Box,
  Button,
  Field,
  FileUpload,
  Flex,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuFileImage } from "react-icons/lu";

const ProfileAdminLayout = () => {
  const id = useLocalStorate("id_company");
  const [image, setImage] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { data, setData } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/company/${id}`
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        company_name: data.company_name,
        description: data.description,
        location: data.location,
        size: data.size,
        company_type: data.company_type,
      });
      setImage(`http://127.0.0.1:3000/${data.photo}`);
    }
  }, [data, reset]);

  const handlePhoto = (file: File) => {
    if (file) {
      const newFile = URL.createObjectURL(file);
      setImage(newFile);
      setImageFile(file);
    }
  };

  const submitUpdateCompany = async (data) => {
    const formData = new FormData();
    formData.append("company_name", data.company_name);
    formData.append("size", data.size);
    formData.append("description", data.description);
    formData.append("company_type", data.company_type);
    formData.append("location", data.location);
    formData.append("photo", imageFile);

    const response = await CompanyAPI.UpdateProfileCompany({
      id: id,
      formData: formData,
    });
    if (response.status == 200) {
      setData(response.data);
      toaster.create({
        title: response.message,
        type: "success",
      });
    }
  };
  return (
    <CompanyLayout>
      <div>
        <form onSubmit={handleSubmit(submitUpdateCompany)}>
          <Flex gap="4" justifyContent="center">
            <Stack>
              {image ? (
                <Image rounded="sm" src={image} width="350px" height="300px" />
              ) : (
                <Box
                  borderWidth="1px"
                  rounded="sm"
                  width="300px"
                  height="300px"
                />
              )}
              <FileUpload.Root
                accept="image/*"
                onChange={(e) => handlePhoto(e.target.files?.[0])}
              >
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm" mx="auto">
                    <LuFileImage /> Upload Image
                  </Button>
                </FileUpload.Trigger>
              </FileUpload.Root>
            </Stack>
            <Stack gap="4" w="full">
              <Field.Root invalid={!!errors.company_name}>
                <Field.Label fontWeight="bold">Name Company</Field.Label>
                <Input
                  {...register("company_name", {
                    required: "Name Company required",
                  })}
                  size="lg"
                />
                <Field.ErrorText>
                  {errors.company_name?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.description}>
                <Field.Label fontWeight="bold">Description</Field.Label>
                <Textarea
                  {...register("description", {
                    required: "Description required",
                  })}
                  size="lg"
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
              <Flex gap="3">
                <Field.Root invalid={!!errors.location}>
                  <Field.Label fontWeight="bold">Location</Field.Label>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={[field.value]}
                        onValueChange={({ value }) => field.onChange(value[0])}
                        onInteractOutside={() => field.onBlur()}
                        collection={indonesianCities}
                        style={{ zIndex: 9999 }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select location " />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner style={{ zIndex: 9999 }}>
                            <Select.Content>
                              {indonesianCities.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                  {item.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    )}
                  />
                  <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.company_type}>
                  <Field.Label fontWeight="bold">Type</Field.Label>
                  <Controller
                    control={control}
                    name="company_type"
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={[field.value]}
                        onValueChange={({ value }) => field.onChange(value[0])}
                        onInteractOutside={() => field.onBlur()}
                        collection={typeCompanyData}
                        style={{ zIndex: 9999 }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select type " />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner style={{ zIndex: 9999 }}>
                            <Select.Content>
                              {typeCompanyData.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                  {item.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    )}
                  />
                  <Field.ErrorText>
                    {errors.company_type?.message}
                  </Field.ErrorText>
                </Field.Root>
              </Flex>
              <Field.Root invalid={!!errors.size}>
                <Field.Label fontWeight="bold">Size</Field.Label>
                <Input
                  {...register("size", {
                    required: "Size required",
                  })}
                  size="lg"
                  type="number"
                />
                <Field.ErrorText>{errors.size?.message}</Field.ErrorText>
              </Field.Root>
            </Stack>
          </Flex>
          <Flex justifyContent="end ">
            <Button type="submit" mt="4" size="sm">
              Save
            </Button>
          </Flex>
        </form>
      </div>
    </CompanyLayout>
  );
};

export default ProfileAdminLayout;
