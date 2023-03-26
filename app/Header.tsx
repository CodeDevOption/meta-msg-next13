import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
type Props = {};

const Header = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex  items-center justify-between p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            width={50}
            height={50}
            alt="Profile Picture"
            src={session?.user?.image!}
          />

          <div className="">
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session?.user?.name}</p>
          </div>
        </div>

        {/* Logout Button */}
        <LogoutButton />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white flex  items-center justify-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/jne"
            width={50}
            height={10}
            alt="Logo"
          />
          <p className="text-blue-400 ">Welcome to the Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
