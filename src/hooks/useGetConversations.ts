import { Conversation } from "@/app/(routes)/dashboard/[uuid]/layout";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";

export const useGetConverstaion = () => {
  const {
    token: { access_token },
  } = useToken();
  const {
    data: conversations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://9742-2405-9800-b861-c89-e0-edf7-56e4-44df.ngrok-free.app/conversations",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch: ${response.status}, Response: ${errorText}`
          );
        }

        if (contentType && contentType.includes("application/json")) {
          const data: Conversation[] = await response.json();
          return data;
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error("Received non-JSON response from server");
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    },
  });

  return { conversations, isLoading, isError };
};
