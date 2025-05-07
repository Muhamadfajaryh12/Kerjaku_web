import axios from "axios";
import { AuthenticationProps } from "../types/Authentication";

const AuthenticationAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;

  const RegisterService = async ({
    username,
    password,
  }: AuthenticationProps) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        username,
        password,
      });
      console.log(response);
      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };

  const LoginService = async ({ username, password }: AuthenticationProps) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      return {
        status: response.status,
        token: response.data.token,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };

  return {
    RegisterService,
    LoginService,
  };
})();

export default AuthenticationAPI;
