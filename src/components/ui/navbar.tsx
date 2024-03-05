"use client";
import SignInOutButton from "./signInOutButton";
import Link from "next/link";
import Image from "next/image";
import zenrichLogo from "../../../public/zenrich-logo.svg";
import zenrichLogoDark from "../../../public/zenrich-logo-dark.svg";
import { useTheme } from "next-themes";

function Navbar() {
  const { resolvedTheme } = useTheme();

  return (
    <nav className="w-full mb-8 flex justify-between px-4 md:px-8 py-4 items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={resolvedTheme === "dark" ? zenrichLogoDark : zenrichLogo}
            className="w-10 mr-4"
            alt="zenrich logo"
          />
        </Link>
        <Link href="/dashboard">
          <p className="font-semibold">Dashboard</p>
        </Link>
      </div>
      <div className="flex items-center">
        <SignInOutButton />
      </div>
    </nav>
  );
}

export default Navbar;
