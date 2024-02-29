"use client";
import { RxCross2, RxPencil2, RxReader } from "react-icons/rx";
import Markdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Note } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import { useIsVisible } from "@/hooks/useIsVisible";
import { useRef } from "react";

const FloatingActions = ({
  onDelete,
  id,
}: {
  onDelete: (id: number) => void;
  id: number;
}) => {
  return (
    <div className="flex justify-between w-24 bg-blue-500 py-2 px-3 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all ">
      <div className="flex-1 flex justify-center">
        <Link
          href={{
            pathname: "/dashboard/notes/viewer",
            query: { id: id },
          }}
        >
          <RxReader />
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Link
          href={{
            pathname: "/dashboard/notes/editor",
            query: { id: id },
          }}
        >
          <RxPencil2 />
        </Link>
      </div>
      <div
        className="flex-1 flex justify-center cursor-pointer"
        onClick={() => onDelete(id)}
      >
        <RxCross2 />
      </div>
    </div>
  );
};

function NoteCard({
  note,
  onDelete,
  index,
}: {
  note: Note;
  onDelete: (id: number) => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isVisible = useIsVisible(ref);

  return (
    <div
      // needed to add transition delay
      style={{ transitionDelay: (index * 100) / 2 + "ms" }}
      className={clsx(
        "group px-2 mb-1 w-full md:w-1/2 lg:w-1/3 relative  transition-opacity  ",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      key={note.id}
      ref={ref}
    >
      <Card className="pt-2 pb-4 px-4 ">
        <div className="flex justify-between items-center mb-2 ">
          <div>
            <p className="font-semibold line-clamp-1 text-ellipses">
              {note.notetitle}
            </p>
            <p className="text-xs text-slate-500">
              {new Date(note.timestamp).toLocaleString()}
            </p>
          </div>

          <FloatingActions onDelete={onDelete} id={note.id} />
        </div>
        <p className="text-sm  line-clamp-2 text-ellipses">
          <Markdown>{note.notebody}</Markdown>
        </p>
      </Card>
    </div>
  );
}

export default NoteCard;
