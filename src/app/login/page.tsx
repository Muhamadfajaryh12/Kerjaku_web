"use client";
import React, { useState } from "react";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import InputText from "../components/form/InputText";
import ButtonPrimary from "../components/button/ButtonPrimary";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationProps } from "../types/Authentication";
import AuthenticationAPI from "../../services/AuthenticationAPI";
import FailedNotification from "../components/notification/FailedNotification";
import { setCookies } from "../../utils/cookie";

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

    if (response.status == 400) {
      setMessage(response.message);
    }
    if (response.status == 200) {
      setCookies("token", response.token);
    }
  };

  return (
    <AuthenticationLayout>
      <div>
        {message && <FailedNotification message={message} />}
        <div className="p-2 rounded-sm border">
          <h1 className="text-center text-xl uppercase font-extrabold">
            Login{" "}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-72 p-2">
            <InputText
              type="text"
              name="username"
              register={register}
              required={true}
              errors={errors}
            />
            <InputText
              type="password"
              name="password"
              register={register}
              required={true}
              errors={errors}
            />
            <ButtonPrimary name="Login" type="submit" click={() => onSubmit} />
          </form>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default LoginPage;
