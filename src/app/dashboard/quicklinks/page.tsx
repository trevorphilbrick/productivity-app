"use client";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import QuicklinkProvider from "@/context/quicklinksContext";
import { RxPlus } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AddQuicklinkForm from "@/components/ui/home/addQuicklinkForm";
import QuicklinksList from "@/components/ui/home/quicklinksList";

function Page() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <QuicklinkProvider>
      <Sheet>
        <div className="flex  px-4 justify-between items-center w-screen md:w-auto ">
          <h1 className="font-semibold text-lg mb-4">Quicklinks</h1>
          <SheetTrigger className="flex items-center text-sm">
            add
            <RxPlus className="ml-1" />
          </SheetTrigger>
        </div>
        <QuicklinksList />
        <AddQuicklinkForm />
      </Sheet>
    </QuicklinkProvider>
  );
}

export default Page;
