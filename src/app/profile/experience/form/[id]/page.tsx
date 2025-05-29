"use client";
import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import MainLayout from "@/layouts/MainLayout";
import ExperienceAPI from "@/services/ExperienceAPI";
import {
  Breadcrumb,
  Button,
  Card,
  Field,
  Flex,
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
      <Card.Root>
        <Card.Header>
          <Card.Title>
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>Profile</Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>Experience</Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>Form</Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <form action="" onSubmit={handleSubmit(submitUpdateExperience)}>
            <Stack gap="4">
              <Field.Root invalid={!!errors.name_experience}>
                <Field.Label fontWeight="bold">Job Title</Field.Label>
                <Input
                  {...register("name_experience", {
                    required: "Job Title required",
                  })}
                  size="md"
                />
                <Field.ErrorText>
                  {errors.name_experience?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.position}>
                <Field.Label fontWeight="bold">Position</Field.Label>
                <Input
                  {...register("position", {
                    required: "Position required",
                  })}
                  size="md"
                />
                <Field.ErrorText>
                  {errors.name_company?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.name_company}>
                <Field.Label fontWeight="bold">Company name</Field.Label>
                <Input
                  {...register("name_company", {
                    required: "Company name required",
                  })}
                  size="md"
                />
                <Field.ErrorText>
                  {errors.name_company?.message}
                </Field.ErrorText>
              </Field.Root>
              <Grid templateColumns="repeat(2,1fr)" gap="6">
                <Field.Root invalid={!!errors.date_start}>
                  <Field.Label fontWeight="bold">Date start</Field.Label>
                  <Input
                    type="date"
                    {...register("date_start", {
                      required: "Date start required",
                    })}
                    size="md"
                  />
                  <Field.ErrorText>
                    {errors.date_start?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.date_end}>
                  <Field.Label fontWeight="bold">Date end</Field.Label>
                  <Input
                    type="date"
                    {...register("date_end", {
                      required: "Date end required",
                    })}
                    size="md"
                  />
                  <Field.ErrorText>{errors.date_end?.message}</Field.ErrorText>
                </Field.Root>
              </Grid>
              <Field.Root invalid={!!errors.description}>
                <Field.Label fontWeight="bold">Description</Field.Label>
                <Textarea
                  {...register("description", {
                    required: "Description required",
                  })}
                  size="md"
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
              <Flex justifyContent="end">
                <Button type="submit" size="sm">
                  Save
                </Button>
              </Flex>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </MainLayout>
  );
};

export default ExperienceUpdateForm;
