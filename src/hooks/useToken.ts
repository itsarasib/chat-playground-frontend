import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import { AxiosError } from "axios";

export const useToken = () => {
  const [token, setToken, removeToken] = useLocalStorage<{
    access_token: string;
  }>("access_token", {
    access_token: "",
  });
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: [token],
    queryFn: async () => {
      try {
        const resp = await axios.post<{ id: number; email: string }>(
          "/info",
          {},
          {
            headers: {
              Authorization: `Bearer ${token?.access_token || ""}`,
            },
          }
        );
        return resp.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            throw new Error("Unauthorized");
          }

          throw new Error("An error occurred");
        }
      }
    },
    retry: false,
  });
  return { token, setToken, removeToken, user, isLoading, error };
};
