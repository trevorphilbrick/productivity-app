"use client";
import SignInOutButton from "./signInOutButton";
import Link from "next/link";
import Image from "next/image";
import zenrichLogo from "../../../public/zenrich-logo.svg";
import zenrichLogoDark from "../../../public/zenrich-logo-dark.svg";
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
import { useSession } from "@/context/sessionContext";

function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const session = useSession();

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
      {pathname.includes("/dashboard") && (
        <Sheet>
          <div className=" flex items-center">
            <p className="mr-4">{session && session.user.username}</p>
            <SheetTrigger>
              <RxGear className="text-xl" />
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
