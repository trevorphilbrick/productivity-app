"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInOutButton() {
  const pathname = usePathname();

  if (pathname === "/signin") {
    return;
  }

  if (pathname.includes("dashboard")) {
    return (
      <Link href="/api/auth/sign-out">
        <Button>Sign Out</Button>
      </Link>
    );
  }

  return (
    <Link href="/signin">
      <Button>Sign In</Button>
    </Link>
  );
}
