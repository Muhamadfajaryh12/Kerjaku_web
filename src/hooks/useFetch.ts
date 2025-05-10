import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetch = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(axios.isAxiosError(error) ? error.response?.message : "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    loading,
    data,
    error,
  };
};
