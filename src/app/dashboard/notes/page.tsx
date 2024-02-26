"use client";

import { deleteNote, fetchNotes } from "@/lib/data";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Note } from "@/lib/types";
import NoteCard from "@/components/ui/home/noteCard";

function Page() {
  const session = useSession();
  const [data, setData] = useState<Note[]>();

  useEffect(() => {
    if (session.data?.user?.name) {
      fetchNotes(session.data?.user?.name).then((res) => {
        console.log(res.notes.rows);
        setData(res.notes.rows);
      });
    }
  }, []);

  const handleDeleteNote = (id: number) => {
    deleteNote(id).then((res) => {
      console.log(res);
      setData(res.notes.rows);
    });
  };

  return (
    <div className="flex flex-wrap">
      {data &&
        data.map((note) => (
          <NoteCard note={note} key={note.id} onDelete={handleDeleteNote} />
        ))}
    </div>
  );
}

export default Page;
