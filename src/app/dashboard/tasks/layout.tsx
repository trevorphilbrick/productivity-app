import React from "react";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/api/auth/signin");
  }
  return <>{children}</>;
}

export default Layout;
