"use client";
import { Quicklink } from "@/lib/types";
import { Card } from "../card";
import { RxExternalLink, RxCross2 } from "react-icons/rx";
import DeletePopover from "./confirmDeletePopover";
import { useIsVisible } from "@/hooks/useIsVisible";
import { useRef, useState } from "react";
import clsx from "clsx";
import useGetFavicon from "@/hooks/useGetFavicon";

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
  const { getDomainName } = useGetFavicon(quicklink.linkurl);
  const [imageError, setImageError] = useState(false);
  return (
    <Card
      style={{ transitionDelay: `${index * 100}ms` }}
      className={clsx(
        "mr-2 mb-2 flex items-center pr-2 transition-opacity duration-1000 border-none shadow-md dark:shadow-neutral-800 ",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      ref={cardRef}
    >
      <a
        href={quicklink.linkurl}
        target="_blank"
        className="py-2 pl-4 flex items-center"
      >
        {imageError ? (
          <div className="w-4 h-4 mr-2">
            <RxExternalLink className="mr-2" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://www.faviconextractor.com/favicon/${getDomainName(
              quicklink.linkurl
            )}`}
            alt="favicon"
            className="w-4 h-4 mr-2"
            onError={() => setImageError(true)}
          />
        )}
        <p className="mr-2">{quicklink.linktitle}</p>
      </a>
      <DeletePopover onDelete={() => onDelete(quicklink.id)} />
    </Card>
  );
}

export default QuicklinkCard;
