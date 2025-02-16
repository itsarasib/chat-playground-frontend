"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import HistoryList from "../_components/HistoryList";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useGetConverstaion } from "@/hooks/useGetConversations";
import { Spinner } from "@/components/ui/Spinner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface Conversation {
  conversationId: string;
  userId: number;
  title: string;
  createdAt: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();
  const {
    conversations: conversationResponse,
    isLoading,
    isError,
  } = useGetConverstaion();

  useEffect(() => {
    if (conversationResponse) {
      setConversations(conversationResponse);
    }
  }, [conversationResponse]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  // if (isError) {
  //   return <div>Error fetching conversations</div>;
  // }

  if (isError) {
    console.log("Error fetching conversations");
  }

  const handleClick = () => {
    router.push(`/dashboard/${uuidv4()}`);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#1A1B1F] text-white transition-all duration-300 ${
          isSidebarVisible ? "w-64" : "w-0"
        } overflow-hidden`}
        style={{ maxWidth: "260px" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex mx-4 gap-2">
            <Image src="/TyphoonLogo.svg" alt="logo" width={30} height={30} />
            <div className="text-xl font-bold">Typhoon</div>
          </div>
          {isSidebarVisible && (
            <Button
              className="m-4 bg-transparent text-white px-2 py-3 rounded-full hover:text-violet-400 hover:border-violet-400 border-2"
              onClick={toggleSidebar}
            >
              <BiHide />
            </Button>
          )}
        </div>

        <Button
          onClick={handleClick}
          className="flex flex-row mx-auto py-5 px-14 text-white font-bold rounded-full border-white bg-transparent hover:bg-transparent hover:text-violet-400 hover:border-violet-400 border-2"
        >
          New chat
        </Button>
        {/* Sidebar History*/}
        <HistoryList conversations={conversations} />
      </div>

      {/* Main content */}
      <div className="flex-1 relative bg-[#121215]">
        {!isSidebarVisible && (
          <Button
            className="absolute top-4 left-4 z-10 border-white bg-transparent text-white px-2 py-3 rounded-full hover:text-violet-400 hover:border-violet-400 border-2"
            onClick={toggleSidebar}
          >
            <BiHide />
          </Button>
        )}
        <div className="p-6 mt-12">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
