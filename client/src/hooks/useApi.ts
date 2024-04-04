import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

import { useAuth } from "providers/AuthProvider";

const { REACT_APP_API_URL } = process.env;

const useApi = <T>(
  url: string,
  onSuccess?: (response: T) => void,
  params?: AxiosRequestConfig
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { logoutUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(`${REACT_APP_API_URL}${url}`, params);

        setResponse(res.data);
        setIsLoading(false);

        if (onSuccess) {
          onSuccess(res.data);
        }
      } catch (error) {
        setError("Error getting the data");
        logoutUser();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line
  }, []);

  return { response, isLoading, error };
};

export default useApi;
