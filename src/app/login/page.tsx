"use client";
import React, { useState } from "react";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationProps } from "../../types/Authentication";
import AuthenticationAPI from "../../services/AuthenticationAPI";
import FailedNotification from "../../components/notification/FailedNotification";
import { setCookies } from "../../utils/cookie";
import {
  Alert,
  Button,
  Card,
  Field,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";

const LoginPage = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthenticationProps>();

  const onSubmit: SubmitHandler<AuthenticationProps> = async (data) => {
    const response = await AuthenticationAPI.LoginService({
      username: data.username,
      password: data.password,
    });
    if (response?.status == 400) {
      setMessage(response?.message);
    }
    if (response?.status == 200) {
      setCookies("token", response?.token);
    }
    console.log(errors);
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
              LOGIN
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
                <Link href="/register" colorPalette="teal" textAlign="center">
                  Register
                </Link>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </div>
    </AuthenticationLayout>
  );
};

export default LoginPage;
