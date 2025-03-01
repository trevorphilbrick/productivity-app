"use client";
import SignInOutButton from "./signInOutButton";
import Link from "next/link";
import Image from "next/image";
import zenrichLogo from "../../../public/icon-192x192.png";
import { useTheme } from "next-themes";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxGear } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { usePathname } from "next/navigation";

function Navbar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="w-full mb-8 flex justify-between px-4 md:px-8 py-4 items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image src={zenrichLogo} className="w-10 mr-4" alt="zenrich logo" />
        </Link>
      </div>
      <div className="flex items-center">
        <SignInOutButton />
      </div>
      {pathname.includes("/dashboard") && (
        <Sheet>
          <div className=" flex items-center">
            <p className="mr-4 hidden md:inline">TODO: username</p>
            <SheetTrigger>
              <RxGear className="text-xl hover:rotate-12 hover:scale-110 active:rotate-180 active:scale-90 transition-all" />
            </SheetTrigger>
          </div>
          <SheetContent className="flex flex-col justify-between">
            <div>
              <SheetHeader className="mb-4">
                <SheetTitle>Preferences</SheetTitle>
              </SheetHeader>
              <Label>
                <p className="mb-2">Theme</p>

                <Select onValueChange={(e) => setTheme(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>
            <Link href="/api/auth/sign-out">
              <Button className="w-full">Sign Out</Button>
            </Link>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
}

export default Navbar;
