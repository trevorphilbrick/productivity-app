"use client";
import { Quicklink } from "@/lib/types";
import { Card } from "../card";
import { RxExternalLink, RxCross2 } from "react-icons/rx";
import DeletePopover from "./confirmDeletePopover";
import { useIsVisible } from "@/hooks/useIsVisible";
import { useRef } from "react";
import clsx from "clsx";

function QuicklinkCard({
  quicklink,
  onDelete,
  index,
}: {
  quicklink: Quicklink;
  onDelete: (id: number) => void;
  index: number;
}) {
  const cardRef = useRef(null);
  const isVisible = useIsVisible(cardRef);
  return (
    <Card
      style={{ transitionDelay: `${index * 100}ms` }}
      className={clsx(
        "mr-2 mb-2 flex items-center pr-2 transition-opacity duration-1000 ",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      ref={cardRef}
    >
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
