"use client";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import QuicklinkProvider from "@/context/quicklinksContext";
import { RxPlus } from "react-icons/rx";

import AddQuicklinkForm from "@/components/ui/home/addQuicklinkForm";
import QuicklinksList from "@/components/ui/home/quicklinksList";
import { textContent } from "@/lib/textContent";

function Page() {
  return (
    <QuicklinkProvider>
      <Sheet>
        <div className="flex  px-4 justify-between items-center w-screen md:w-auto ">
          <h1 className="font-semibold text-lg mb-4">
            {textContent.quicklinks.quicklinkSectionHeader}
          </h1>
          <SheetTrigger className="flex items-center text-sm">
            {textContent.quicklinks.quicklinkSectionAddButton}
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
