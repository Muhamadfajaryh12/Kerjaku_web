import { cookies } from "next/headers";

export const setAuthToken = (token: string) => {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 minggu
    path: "/",
  });
};

export const getAuthToken = () => {
  return cookies().get("token")?.value;
};
