"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInOutButton() {
  return (
    <Link href="/auth">
      <Button>Sign in</Button>
    </Link>
  );
}
