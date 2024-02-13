"use client";
import { Quicklink } from "@/lib/types";
import { Card } from "../card";
import { RxExternalLink, RxCross2 } from "react-icons/rx";

function QuicklinkCard({
  quicklink,
  onDelete,
}: {
  quicklink: Quicklink;
  onDelete: (id: number) => void;
}) {
  return (
    <Card className="  mr-2 mb-2 flex items-center">
      <a
        href={quicklink.linkurl}
        target="_blank"
        className="py-2 pl-4 flex items-center"
      >
        <RxExternalLink className="mr-2" />
        <p>{quicklink.linktitle}</p>
      </a>

      <RxCross2
        className=" ml-4 mr-2 my-2 "
        onClick={() => onDelete(quicklink.id)}
      />
    </Card>
  );
}

export default QuicklinkCard;
