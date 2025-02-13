import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center max-w-3xl">
        <div className="flex items-center justify-center gap-2">
          <Image src="/TyphoonLogo.svg" alt="logo" width={60} height={60} />
          <h2 className="font-bold text-[60px]">Typhoon</h2>
        </div>
        <h2 className="text-xl mt-5 text-slate-500">
          Open-Source Language Technologies for Thai Language Knowledge, and
          Culture
        </h2>
        <Link href="/dashboard">
          <Button className="mt-5 px-10 py-6 font-bold rounded-full">
            Enter Playground
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
