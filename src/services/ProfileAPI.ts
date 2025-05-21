import { FormDataProps } from "@/types/Company";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const token = Cookies.get("token");
  const InsertProfile = async ({ formData }: FormDataProps) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status == 201) {
        localStorage.setItem("id_profile", response.data.data.id);
      }
      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };

  const UpdateProfile = async ({
    id,
    formData,
  }: {
    id: number;
    formData: FormDataProps;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/profile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
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

  return {
    InsertProfile,
    UpdateProfile,
  };
})();

export default ProfileAPI;
