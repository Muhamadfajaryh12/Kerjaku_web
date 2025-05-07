"use client";
import Cookies from "js-cookie";

export const setCookies = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies.set(name, value, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    ...options,
  });
};
