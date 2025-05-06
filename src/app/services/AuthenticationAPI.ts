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
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const LoginService = async ({ username, password }: AuthenticationProps) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    RegisterService,
    LoginService,
  };
})();

export default AuthenticationAPI;
