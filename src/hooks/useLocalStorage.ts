import { useEffect, useState } from "react";

export const useLocalStorate = (key: string) => {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, [key]);
  return value;
};
