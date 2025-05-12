"use client";
import React, { useState } from "react";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import InputText from "../../components/form/InputText";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticationProps } from "../../types/Authentication";
import AuthenticationAPI from "../../services/AuthenticationAPI";
import FailedNotification from "../../components/notification/FailedNotification";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AuthenticationProps>();

  const onSubmit: SubmitHandler<AuthenticationProps> = async (data) => {
    const response = await AuthenticationAPI.RegisterService({
      username: data.username,
      password: data.password,
    });

    if (response.status == 400) {
      setMessage(response.message);
    }

    if (response.status == 201) {
      toast.success(response.message);
      setMessage("");
      reset();
    }
  };

  return (
    <AuthenticationLayout>
      <div>
        {message && <FailedNotification message={message} />}
        <div className="p-2 rounded-sm border">
          <h1 className="text-center text-xl uppercase font-extrabold">
            Register{" "}
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
            <ButtonPrimary
              name="Register"
              type="submit"
              click={() => onSubmit}
            />
          </form>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterPage;
