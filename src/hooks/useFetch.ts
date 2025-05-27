import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useFetch = <T = any>(url: string) => {
  const [data, setData] = useState<T | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = Cookies.get("token");
  console.log(url);
  const fetch = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      setError(axios.isAxiosError(error) ? error.response?.message : "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [url]);

  return {
    loading,
    data,
    error,
    setData,
  };
};
