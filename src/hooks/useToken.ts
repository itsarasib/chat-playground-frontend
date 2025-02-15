import { useLocalStorage } from "usehooks-ts";

export const useToken = () => {
  const [token, setToken, removeToken] = useLocalStorage<{
    token: string;
    ttl: number;
  }>("token", { token: "", ttl: 0 });
  return { token, setToken, removeToken };
};
