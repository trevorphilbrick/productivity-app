"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxPlus } from "react-icons/rx";
import { usePathname } from "next/navigation";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="mb-4">
      <div className="flex  px-4 justify-between items-center w-screen md:w-auto ">
        <h1 className="font-semibold text-lg mb-4">Notes</h1>
        {pathname === "/dashboard/notes" && (
          <Link href="/dashboard/notes/editor">
            <Button
              variant="ghost"
              className="flex items-center text-sm p-0 hover:bg-transparent font-normal"
            >
              add
              <RxPlus className="ml-1" />
            </Button>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

export default Layout;
