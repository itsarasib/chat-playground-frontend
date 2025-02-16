"use client";

import { Spinner } from "@/components/ui/Spinner";
import { useToken } from "@/hooks/useToken";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading, error } = useToken();

  const unauthorizedPage = (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1> you are not logged in </h1>
      <br />
      <Link href="/login" className="font-bold text-blue-400">
        login
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (error?.message === "Unauthorized") {
    return unauthorizedPage;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1> {error.message} </h1>
      </div>
    );
  }

  if (!user) {
    return unauthorizedPage;
  }
  return <div>{children}</div>;
}
