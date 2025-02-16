"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { BiHide } from "react-icons/bi";
import HistoryList from "../_components/HistoryList";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${uuidv4()}`);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 ${
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
              className="m-4 bg-transparent border-2 text-white px-2 py-3 rounded-full hover:bg-gray-400"
              onClick={toggleSidebar}
            >
              <BiHide />
            </Button>
          )}
        </div>

        <Button onClick={handleClick}>New chat</Button>
        {/* Sidebar History*/}
        <HistoryList />
      </div>

      {/* Main content */}
      <div className="flex-1 relative">
        {!isSidebarVisible && (
          <Button
            className="absolute top-4 left-4 z-10 border-2 border-black bg-transparent text-black px-2 py-3 rounded-full hover:bg-gray-400"
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
