"use client";
import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import MainLayout from "@/layouts/MainLayout";
import ExperienceAPI from "@/services/ExperienceAPI";
import {
  Breadcrumb,
  Button,
  Field,
  Grid,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ExperienceUpdateForm = () => {
  const params = useParams();
  const IdProfile = useLocalStorate("id_profile");
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/experience/${params.id}`
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name_experience: "",
      name_company: "",
      position: "",
      date_start: "",
      date_end: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name_experience: data.name_experience,
        name_company: data.name_company,
        position: data.position,
        date_start: data.date_start?.split("T")[0],
        date_end: data.date_end?.split("T")[0],
        description: data.description,
      });
    }
  }, [data, reset]);

  const submitUpdateExperience = async (data) => {
    const response = await ExperienceAPI.UpdateExperience({
      name_experience: data.name_experience,
      name_company: data.name_company,
      position: data.position,
      date_start: new Date(data.date_start).toISOString(),
      date_end: new Date(data.date_end).toISOString(),
      description: data.description,
      id_profile: parseInt(IdProfile),
      id: parseInt(params.id),
    });
    if (response?.status == 200) {
      toaster.create({
        title: response.message,
        type: "success",
      });
    }
  };
  return (
    <MainLayout>
      <Breadcrumb.Root my="5">
        <Breadcrumb.List>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>Experience</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>Form</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <form action="" onSubmit={handleSubmit(submitUpdateExperience)}>
        <Stack gap="4">
          <Field.Root invalid={!!errors.name_experience}>
            <Field.Label>Nama Pekerjaan</Field.Label>
            <Input
              {...register("name_experience", {
                required: "Nama Lengkap tidak boleh kosong",
              })}
              size="lg"
            />
            <Field.ErrorText>{errors.name_experience?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.position}>
            <Field.Label>Posisi</Field.Label>
            <Input
              {...register("position", {
                required: "Nama Lengkap tidak boleh kosong",
              })}
              size="lg"
            />
            <Field.ErrorText>{errors.name_company?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.name_company}>
            <Field.Label>Nama Perusahaan</Field.Label>
            <Input
              {...register("name_company", {
                required: "Nama Lengkap tidak boleh kosong",
              })}
              size="lg"
            />
            <Field.ErrorText>{errors.name_company?.message}</Field.ErrorText>
          </Field.Root>
          <Grid templateColumns="repeat(2,1fr)" gap="6">
            <Field.Root invalid={!!errors.date_start}>
              <Field.Label>Tanggal Mulai</Field.Label>
              <Input
                type="date"
                {...register("date_start", {
                  required: "Nama Lengkap tidak boleh kosong",
                })}
                size="lg"
              />
              <Field.ErrorText>{errors.date_start?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.date_end}>
              <Field.Label>Tanggal Selesai</Field.Label>
              <Input
                type="date"
                {...register("date_end", {
                  required: "Nama Lengkap tidak boleh kosong",
                })}
                size="lg"
              />
              <Field.ErrorText>{errors.date_end?.message}</Field.ErrorText>
            </Field.Root>
          </Grid>
          <Field.Root invalid={!!errors.description}>
            <Field.Label>Deskripsi</Field.Label>
            <Textarea
              {...register("description", {
                required: "Nama Lengkap tidak boleh kosong",
              })}
              size="lg"
            />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </MainLayout>
  );
};

export default ExperienceUpdateForm;
