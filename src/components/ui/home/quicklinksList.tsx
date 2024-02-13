"use client";
import { useContext, useEffect } from "react";
import { QuicklinkContext } from "@/context/quicklinksContext";
import { fetchQuicklinks } from "@/lib/data";
import { useSession } from "next-auth/react";
import { Card } from "../card";
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

  return (
    <div className="flex">
      {quicklinks.map((quicklink) => (
        <QuicklinkCard quicklink={quicklink} key={quicklink.id} />
      ))}
    </div>
  );
}

export default QuicklinksList;
