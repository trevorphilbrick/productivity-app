"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInOutButton() {
  const pathname = usePathname();

  if (pathname === "/signin" || pathname.includes("dashboard")) {
    return;
  }

  return (
    <Link href="/signin">
      <Button>Sign In</Button>
    </Link>
  );
}
