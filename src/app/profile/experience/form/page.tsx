"use client";
import MainLayout from "@/layouts/MainLayout";
import {
  Breadcrumb,
  Button,
  Field,
  Grid,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

const ExperienceForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
      <form action="">
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

export default ExperienceForm;
