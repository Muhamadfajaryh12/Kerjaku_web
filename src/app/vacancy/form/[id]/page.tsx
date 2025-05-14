"use client";
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, Field, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

const FormApplicationVacancyPage = () => {
  const { register, handleSubmit } = useForm();
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

        <form action="">
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input {...register("Name")} size="md" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input {...register("Name")} size="md" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input {...register("Name")} size="md" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input {...register("Name")} size="md" />
          </Field.Root>
        </form>
      </div>
    </MainLayout>
  );
};

export default FormApplicationVacancyPage;
