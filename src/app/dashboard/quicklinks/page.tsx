"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import QuicklinkProvider from "@/context/quicklinksContext";
import React from "react";
import { RxPlus } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Page() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <QuicklinkProvider>
      <Sheet>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg mb-4">Quicklinks</h1>
          <SheetTrigger className="flex items-center text-sm">
            add
            <RxPlus className="ml-1" />
          </SheetTrigger>
        </div>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Add A Link</SheetTitle>
            <SheetDescription>
              Fill out the form below to add a quicklink
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </QuicklinkProvider>
  );
}

export default Page;
