import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
const Header = () => {
  const conversationId = uuidv4();

  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-md">
        <div className="flex items-center gap-2">
          <Image src="/TyphoonLogo.svg" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">Typhoon</h1>
        </div>
        <ul className="hidden md:flex gap-7 text-base font-bold">
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Research
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Blog
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            About
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            FAQs
          </li>
        </ul>
        <div className="flex gap-5">
          <Link href={`/dashboard/${conversationId}`}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
