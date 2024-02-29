"use client";

import { deleteNote, fetchNotes } from "@/lib/data";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Note } from "@/lib/types";
import NoteCard from "@/components/ui/home/noteCard";
import clsx from "clsx";

function Page() {
  const session = useSession();
  const [data, setData] = useState<Note[]>();

  useEffect(() => {
    const getNotes = async () => {
      if (session.data?.user?.name) {
        await fetchNotes(session.data?.user?.name).then((res) => {
          setData(res.notes.rows);
        });
      }
    };
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id).then((res) => {
      setData(res.notes.rows);
    });
  };

  return (
    <div className="flex flex-wrap">
      {data &&
        data.map((note, index) => (
          <NoteCard
            note={note}
            key={note.id}
            onDelete={handleDeleteNote}
            index={index}
          />
        ))}
    </div>
  );
}

export default Page;
