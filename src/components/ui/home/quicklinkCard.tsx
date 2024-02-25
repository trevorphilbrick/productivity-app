"use client";
import { Quicklink } from "@/lib/types";
import { Card } from "../card";
import { RxExternalLink, RxCross2 } from "react-icons/rx";
import DeletePopover from "./confirmDeletePopover";

function QuicklinkCard({
  quicklink,
  onDelete,
}: {
  quicklink: Quicklink;
  onDelete: (id: number) => void;
}) {
  return (
    <Card className=" mr-2 mb-2 flex items-center pr-2">
      <a
        href={quicklink.linkurl}
        target="_blank"
        className="py-2 pl-4 flex items-center"
      >
        <RxExternalLink className="mr-2" />
        <p>{quicklink.linktitle}</p>
      </a>
      <DeletePopover onDelete={() => onDelete(quicklink.id)} />
    </Card>
  );
}

export default QuicklinkCard;
