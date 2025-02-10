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
        <div className="flex justify-between items-center py-3 px-4 mb-4 bg-[url('https://5ftd8mwqickudvmi.public.blob.vercel-storage.com/Gradient-4kKNDqrDamDqgIp47BgNd54TLgJV9T.png')] bg-center bg-cover rounded-sm text-white shadow-md dark:shadow-neutral-800  shadow-neutral-200">
          <h1 className="font-semibold text-lg">
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
