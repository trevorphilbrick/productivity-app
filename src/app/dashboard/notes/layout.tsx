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
      <div className="flex justify-between items-center py-3 px-4 mb-4 bg-[url('https://5ftd8mwqickudvmi.public.blob.vercel-storage.com/Gradient-4kKNDqrDamDqgIp47BgNd54TLgJV9T.png')] bg-center bg-cover rounded-sm text-white shadow-md dark:shadow-neutral-800  shadow-neutral-200 ">
        <h1 className="font-semibold text-lg">Notes</h1>

        {pathname === "/dashboard/notes" && (
          <Link
            href="/dashboard/notes/editor"
            className="flex items-center text-sm"
          >
            add
            <RxPlus className="ml-1" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

export default Layout;
