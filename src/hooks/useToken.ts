import { useLocalStorage } from "usehooks-ts";

export const useToken = () => {
  const [token, setToken, removeToken] = useLocalStorage<{
    access_token: string;
  }>("access_token", {
    access_token: "",
  });
  return { token, setToken, removeToken };
};
