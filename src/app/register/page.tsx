"use client";
import React, { useState } from "react";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationProps } from "../../types/Authentication";
import AuthenticationAPI from "../../services/AuthenticationAPI";
import {
  Alert,
  Button,
  Card,
  Field,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";

const RegisterPage = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthenticationProps>();

  const onSubmit: SubmitHandler<AuthenticationProps> = async (data) => {
    const response = await AuthenticationAPI.RegisterService({
      username: data.username,
      password: data.password,
    });
    if (response?.status == 400) {
      setMessage(response?.message);
    }
  };

  return (
    <AuthenticationLayout>
      <div>
        {message && (
          <Alert.Root status="error" my="2">
            <Alert.Indicator />
            <Alert.Title>{message}</Alert.Title>
          </Alert.Root>
        )}
        <Card.Root size="lg">
          <Card.Header>
            <Heading fontWeight="bold" className="text-center">
              Register
            </Heading>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap="4" align="flex-start" maxW="xl">
                <Field.Root invalid={!!errors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.password}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    {...register("password", {
                      required: "Password is required",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>
                <Button type="submit" mx="auto" width="full">
                  Submit
                </Button>
                <Text textAlign="center" mx="auto">
                  Sudah punya akun?
                  <Link
                    href="/login"
                    colorPalette="teal"
                    mx="1"
                    fontWeight="bold"
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterPage;
