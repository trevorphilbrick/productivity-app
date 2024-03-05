"use client";
import { useContext, useEffect, useState } from "react";
import { QuicklinkContext } from "@/context/quicklinksContext";
import { fetchQuicklinks, deleteQuicklink } from "@/lib/data";
import QuicklinkCard from "./quicklinkCard";
import { Skeleton } from "../skeleton";

function QuicklinksList() {
  const { quicklinks, setQuicklinks } = useContext(QuicklinkContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuicklinks()
      .then((data) => {
        setQuicklinks(data.quicklinks.rows);
      })
      .then(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  const onDelete = (id: number) => {
    deleteQuicklink(id).then((data) => {
      setQuicklinks(data.quicklinks.rows);
    });
  };

  if (loading) {
    return (
      <div className="flex flex-wrap mx-4">
        <Skeleton className="h-12 w-64 mr-2 mb-2" />
        <Skeleton className="h-12 w-32 mr-2 mb-2" />
        <Skeleton className="h-12 w-48 mr-2 mb-2" />
        <Skeleton className="h-12 w-24 mr-2 mb-2" />
        <Skeleton className="h-12 w-64 mr-2 mb-2" />
        <Skeleton className="h-12 w-32 mr-2 mb-2" />
        <Skeleton className="h-12 w-48 mr-2 mb-2" />
        <Skeleton className="h-12 w-32 mr-2 mb-2" />
        <Skeleton className="h-12 w-48 mr-2 mb-2" />
        <Skeleton className="h-12 w-24 mr-2 mb-2" />
        <Skeleton className="h-12 w-64 mr-2 mb-2" />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap mx-4">
      {quicklinks.map((quicklink, index) => (
        <QuicklinkCard
          quicklink={quicklink}
          key={quicklink.id}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
}

export default QuicklinksList;
