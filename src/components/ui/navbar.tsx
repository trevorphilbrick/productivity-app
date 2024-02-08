"use client";
import { useSession } from "next-auth/react";
import SignInOutButton from "./signInOutButton";
import Link from "next/link";

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="w-full bg-blue-300 mb-8 flex justify-between px-8 py-4 items-center">
      <div className="flex items-center">
        <Link href="/">
          <p className="text-xl font-bold mr-4">Productivity</p>
        </Link>
        <Link href="/dashboard">
          <p className="">Dashboard</p>
        </Link>
      </div>
      <div className="flex items-center">
        {session && <p className="mr-2">{session.user?.name}</p>}
        <SignInOutButton />
      </div>
    </nav>
  );
}

export default Navbar;
