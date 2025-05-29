"use client";
import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import MainLayout from "@/layouts/MainLayout";
import ProfileAPI from "@/services/ProfileAPI";
import { ProfileProps } from "@/types/ProfileProps";
import {
  Badge,
  Box,
  Breadcrumb,
  Button,
  Card,
  CloseButton,
  createListCollection,
  Field,
  FileUpload,
  Flex,
  Image,
  Input,
  InputGroup,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuFileImage, LuFileUp } from "react-icons/lu";

const skillsData = createListCollection({
  items: [
    { label: "Programmer", value: "Programmer" },
    { label: "Network Engineer", value: "Network Engineer" },
    { label: "Web Developer", value: "Web Developer" },
  ],
});

const ProfileFormPage = () => {
  const params = useParams();
  const [skills, setSkills] = useState([]);
  const [cv, setCV] = useState<File | null>(null);
  const [nameCV, setNameCV] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState("");
  const router = useRouter();

  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/profile/${params.id}`
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        nama: data.name,
        ringkasan: data.summary,
        email: data.email,
        alamat: data.address,
        pendidikan: data.education,
        phone: data.phone,
        tanggal_lahir: data.birth?.split("T")[0],
      });
      setSkills(data.skills);
      setPhotoURL(`http://127.0.0.1:3000/${data?.photo}`);
      setNameCV(`${data?.cv}`);
    }
  }, [reset, data]);
  const id = useLocalStorate("id");
  const handleChangeSkills = (data: string) => {
    if (data) {
      setSkills((prevItems) => [...prevItems, data]);
    }
  };

  const handleRemoveSkills = (data: string) => {
    setSkills(skills.filter((item) => item != data));
  };

  const handleCV = (data: File) => {
    if (data) {
      setNameCV(data.name);
      setCV(data);
    }
  };

  const handlePhoto = (data: File) => {
    if (data) {
      const file = URL.createObjectURL(data);
      setPhotoURL(file);
      setPhoto(data);
    }
  };

  const submitForm = async (dataForm) => {
    const formData = new FormData();
    formData.append("name", dataForm.nama);
    formData.append("summary", dataForm.ringkasan);
    formData.append("email", dataForm.email);
    formData.append("address", dataForm.alamat);
    formData.append("education", dataForm.pendidikan);
    formData.append("birth", new Date(dataForm.tanggal_lahir).toISOString());
    formData.append("phone", dataForm.phone);
    formData.append("skills", skills);
    formData.append("cv", cv);
    formData.append("photo", photo);
    formData.append("id_user", id);

    const response = await ProfileAPI.UpdateProfile({
      formData: formData,
      id: data.id,
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
                <Breadcrumb.Item>Form</Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <form action="" onSubmit={handleSubmit(submitForm)}>
            <Flex gap="10" justifyContent="center">
              <Stack>
                {photoURL ? (
                  <Image
                    rounded="sm"
                    src={photoURL}
                    width="200px"
                    height="200px"
                  />
                ) : (
                  <Box
                    borderWidth="1px"
                    rounded="sm"
                    width="200px"
                    height="200px"
                  />
                )}

                <FileUpload.Root
                  accept="image/*"
                  onChange={(e) => handlePhoto(e.target.files?.[0])}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" size="md" mx="auto">
                      <LuFileImage /> Upload Image
                    </Button>
                  </FileUpload.Trigger>
                  {/* <FileUploadList /> */}
                </FileUpload.Root>
              </Stack>

              <Stack gap="4">
                <Field.Root invalid={!!errors.nama}>
                  <Field.Label>Name</Field.Label>
                  <Input
                    {...register("nama", {
                      required: "Name required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.nama?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.tanggal_lahir}>
                  <Field.Label>Birth Date</Field.Label>
                  <Input
                    type="date"
                    {...register("tanggal_lahir", {
                      required: "Birth date required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>
                    {errors.tanggal_lahir?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.ringkasan}>
                  <Field.Label>Summary</Field.Label>
                  <Input
                    {...register("ringkasan", {
                      required: "Summary required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.ringkasan?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.pendidikan}>
                  <Field.Label>Education</Field.Label>
                  <Input
                    {...register("pendidikan", {
                      required: "Education required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>
                    {errors.pendidikan?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Flex gap="4">
                  <Field.Root invalid={!!errors.alamat}>
                    <Field.Label>Address</Field.Label>
                    <Input
                      {...register("alamat", {
                        required: "Address required",
                      })}
                      size="lg"
                    />
                    <Field.ErrorText>{errors.alamat?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>Phone</Field.Label>
                    <Input
                      {...register("phone", {
                        required: "Phone required",
                      })}
                      size="lg"
                    />
                    <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                  </Field.Root>
                </Flex>
                <FileUpload.Root
                  gap="1"
                  onChange={(e) => handleCV(e.target?.files[0])}
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
                <Button colorPalette="red" asChild>
                  <Link
                    href={`http://127.0.0.1:3000/${nameCV}`}
                    target="_blank"
                  >
                    Open CV
                  </Link>
                </Button>
                <div>
                  <Select.Root
                    collection={skillsData}
                    size="lg"
                    onChange={(e) => handleChangeSkills(e.target.value)}
                  >
                    <Select.HiddenSelect />
                    <Select.Label>Skills</Select.Label>
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Choose skill" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {skillsData.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                  <Flex mt="2" gap="2" w="96" flexWrap="wrap">
                    {skills &&
                      skills?.map((item, index) => (
                        <Badge size="lg" key={index}>
                          {item}
                          <button
                            onClick={() => handleRemoveSkills(item)}
                            type="button"
                          >
                            x
                          </button>
                        </Badge>
                      ))}
                  </Flex>
                </div>
                <Button type="submit">Save</Button>
              </Stack>
            </Flex>
          </form>
        </Card.Body>
      </Card.Root>
    </MainLayout>
  );
};

export default ProfileFormPage;
