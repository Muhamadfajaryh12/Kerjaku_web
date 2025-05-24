"use client";
import CompanyLayout from "@/layouts/CompanyLayout";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Field,
  Flex,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  categoryJobData,
  educationData,
  experienceTimeData,
  siteData,
  statusData,
  typeData,
} from "@/utils/data";
import VacancyAPI from "@/services/VacancyAPI";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import { toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

const FormAdminVacancy = () => {
  const IdCompany = useLocalStorate("id_company");
  const params = useParams();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/vacancy/${params.id}`
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
        name_vacancy: data.name_vacancy,
        location: data.location,
        salary: data.salary,
        qty: data.qty,
        description: data.description,
        date_start: data.date_start?.split("T")[0],
        date_end: data.date_end?.split("T")[0],
        type: data?.type,
        category: data?.category,
        experience_time: data.experience_time,
        education: data.education,
        site: data.at_where,
        status: data.status,
      });
    }
  }, [data, reset]);

  const submitVacancy = async (data) => {
    const response = await VacancyAPI.UpdateVacancy({
      name_vacancy: data.name_vacancy,
      location: data.location,
      description: data.description,
      salary: data.salary,
      qty: data.qty,
      at_where: data.site,
      category: data.category,
      education: data.education,
      type: data.type,
      experience_time: data.experience_time,
      status: data.status,
      date_start: new Date(data.date_start).toISOString(),
      date_end: new Date(data.date_end).toISOString(),
      id_company: parseInt(IdCompany),
      id: parseInt(params.id),
    });
    if (response?.status == 200) {
      toaster.create({
        title: response?.message,
        type: "success",
      });
    }
  };
  return (
    <CompanyLayout title="Vacancy">
      <div>
        <form onSubmit={handleSubmit(submitVacancy)}>
          <Stack gap="5">
            <Field.Root invalid={!!errors.name_vacancy}>
              <Field.Label>Name Vacancy</Field.Label>
              <Input
                {...register("name_vacancy", {
                  required: "name vacancy is required",
                })}
                size="md"
              />
              <Field.ErrorText>{errors.name_vacancy?.message}</Field.ErrorText>
            </Field.Root>
            <Flex gap="3">
              <Field.Root invalid={!!errors.location}>
                <Field.Label>Location</Field.Label>
                <Input
                  {...register("location", {
                    required: "location is required",
                  })}
                  size="md"
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.salary}>
                <Field.Label>Salary</Field.Label>
                <Input
                  {...register("salary", {
                    required: "salary is required",
                  })}
                  size="md"
                  type="number"
                />
                <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.qty}>
                <Field.Label>Qty</Field.Label>
                <Input
                  {...register("qty", {
                    required: "qty is required",
                  })}
                  size="md"
                  type="number"
                />
                <Field.ErrorText>{errors.qty?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>
            <Flex gap="3">
              <Field.Root invalid={!!errors.type}>
                <Field.Label>Type</Field.Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => field.onChange(value[0])}
                      onInteractOutside={() => field.onBlur()}
                      collection={typeData}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select type" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {typeData.items.map((item) => (
                              <Select.Item
                                item={item}
                                key={item.value}
                                selected={item.value === field.value}
                              >
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
                <Field.ErrorText>{errors.type?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.category}>
                <Field.Label>Category</Field.Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => field.onChange(value[0])}
                      onInteractOutside={() => field.onBlur()}
                      collection={categoryJobData}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select Category" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {categoryJobData.items.map((item) => (
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
                <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.site}>
                <Field.Label>Site</Field.Label>
                <Controller
                  control={control}
                  name="site"
                  defaultValue={data?.at_where}
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => field.onChange(value[0])}
                      onInteractOutside={() => field.onBlur()}
                      collection={siteData}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select site" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {siteData.items.map((item) => (
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
                <Field.ErrorText>{errors.site?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>
            <Flex gap="3">
              <Field.Root invalid={!!errors.education}>
                <Field.Label>Education</Field.Label>
                <Controller
                  control={control}
                  name="education"
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => field.onChange(value[0])}
                      onInteractOutside={() => field.onBlur()}
                      collection={educationData}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select type" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {educationData.items.map((item) => (
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
                <Field.ErrorText>{errors.education?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.experience_time}>
                <Field.Label>Experience</Field.Label>
                <Controller
                  control={control}
                  name="experience_time"
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => field.onChange(value[0])}
                      onInteractOutside={() => field.onBlur()}
                      collection={experienceTimeData}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select experience" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {experienceTimeData.items.map((item) => (
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
                  {errors.experience_time?.message}
                </Field.ErrorText>
              </Field.Root>
            </Flex>
            <Field.Root invalid={!!errors.description}>
              <Field.Label>Description</Field.Label>
              <Textarea
                {...register("description", {
                  required: "Description required",
                })}
                size="lg"
              />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>
            <Flex gap="4">
              <Field.Root invalid={!!errors.date_start}>
                <Field.Label>Date open</Field.Label>
                <Input
                  {...register("date_start", {
                    required: "date_start is required",
                  })}
                  size="md"
                  type="date"
                  disabled
                />
                <Field.ErrorText>{errors.date_end?.message}</Field.ErrorText>
              </Field.Root>{" "}
              <Field.Root invalid={!!errors.date_end}>
                <Field.Label>Date close</Field.Label>
                <Input
                  {...register("date_end", {
                    required: "date_end is required",
                  })}
                  size="md"
                  type="date"
                />
                <Field.ErrorText>{errors.date_end?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.status}>
                <Field.Label>Status</Field.Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      value={[field.value]}
                      onValueChange={({ value }) => field.onChange(value[0])}
                      onInteractOutside={() => field.onBlur()}
                      collection={statusData}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select experience" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {statusData.items.map((item) => (
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
                <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </div>
    </CompanyLayout>
  );
};

export default FormAdminVacancy;
