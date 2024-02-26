"use client";

import { Card } from "@/components/ui/card";
import { fetchNotes } from "@/lib/data";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSession } from "next-auth/react";
import { Note } from "@/lib/types";

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
  return (
    <div className="flex flex-wrap">
      {data &&
        data.map((note) => (
          <div className="px-2 mb-4 w-full md:w-1/2 lg:w-1/3" key={note.id}>
            <Card className="pt-2 pb-4 px-4">
              <p className="mb-1 font-semibold line-clamp-1 text-ellipses">
                {note.notetitle}
              </p>
              <p className="text-sm mb-4 line-clamp-2 text-ellipses">
                <Markdown>{note.notebody}</Markdown>
              </p>
              <p className="text-xs text-slate-500">{note.timestamp}</p>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default Page;
