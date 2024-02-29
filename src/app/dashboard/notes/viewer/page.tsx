"use client";
import { fetchNote } from "@/lib/data";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSession } from "next-auth/react";
import { Note } from "@/lib/types";
import styles from "./markdown.module.css";

function Page({ searchParams }: { searchParams: { id: number } }) {
  const session = useSession();
  const [data, setData] = useState<Note>();

  useEffect(() => {
    if (!session.data?.user?.name) return;
    fetchNote(session.data?.user?.name, searchParams.id).then((res) => {
      setData(res.note.rows[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  return (
    data && (
      <div className="mx-4">
        <Markdown
          className={styles.markdown}
        >{`# ${data.notetitle}\n\n${data.notebody}`}</Markdown>
        <p className="text-slate-500 text-xs mt-8 text-end">
          Last edited at {new Date(data.timestamp).toLocaleString()}
        </p>
      </div>
    )
  );
}

export default Page;