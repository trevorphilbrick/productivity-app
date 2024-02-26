import { useState } from "react";
import { RxCross2, RxPencil2, RxReader } from "react-icons/rx";
import Markdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Note } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";

const FloatingActions = ({
  isVisible,
  onDelete,
  id,
}: {
  isVisible: boolean;
  onDelete: (id: number) => void;
  id: number;
}) => {
  return (
    <div
      className={clsx(
        "flex justify-between w-24 absolute top-4 right-6 bg-blue-500 py-2 px-3 rounded-full ",
        !isVisible && "lg:hidden"
      )}
    >
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
        <RxPencil2 />
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
}: {
  note: Note;
  onDelete: (id: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="px-2 mb-4 w-full md:w-1/2 lg:w-1/3 relative"
      key={note.id}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FloatingActions isVisible={isHovered} onDelete={onDelete} id={note.id} />

      <Card className="pt-2 pb-4 px-4 ">
        <p className="mb-1 font-semibold line-clamp-1 text-ellipses">
          {note.notetitle}
        </p>
        <p className="text-sm mb-4 line-clamp-2 text-ellipses">
          <Markdown>{note.notebody}</Markdown>
        </p>
        <p className="text-xs text-slate-500">{note.timestamp}</p>
      </Card>
    </div>
  );
}

export default NoteCard;
