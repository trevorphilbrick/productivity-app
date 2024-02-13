"use client";
import { useContext, useEffect } from "react";
import { QuicklinkContext } from "@/context/quicklinksContext";
import { fetchQuicklinks, deleteQuicklink } from "@/lib/data";
import { useSession } from "next-auth/react";
import QuicklinkCard from "./quicklinkCard";

function QuicklinksList() {
  const { data: session } = useSession();
  const { quicklinks, setQuicklinks } = useContext(QuicklinkContext);

  useEffect(() => {
    if (!session?.user?.name) return;
    fetchQuicklinks(session?.user?.name).then((data) => {
      setQuicklinks(data.quicklinks.rows);
      console.log("quicklinks", quicklinks);
    });
  }, []);

  useEffect(() => {
    console.log("quicklinks", quicklinks);
  }, [quicklinks]);

  const onDelete = (id: number) => {
    deleteQuicklink(id).then((data) => {
      setQuicklinks(data.quicklinks.rows);
    });
  };

  return (
    <div className="flex flex-wrap mx-4">
      {quicklinks.map((quicklink) => (
        <QuicklinkCard
          quicklink={quicklink}
          key={quicklink.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default QuicklinksList;
