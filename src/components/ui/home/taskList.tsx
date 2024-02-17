"use client";
import TaskCard from "./taskCard";
import { fetchTasks } from "@/lib/data";
import { useEffect, useContext, useState } from "react";
import { TaskContext } from "@/context/taskContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Skeleton } from "../skeleton";

function TaskList() {
  const { data: session } = useSession();
  const { tasks, setTasks } = useContext(TaskContext);

  const [loading, setLoading] = useState(true);

  if (!session) {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    if (!session?.user?.name) return; // handle no user
    fetchTasks(session?.user?.name)
      .then((data) => {
        setTasks(data.tasks.rows.sort((a: any, b: any) => a.id - b.id));
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton className="h-12 mx-4 mb-2" />
        <Skeleton className="h-12 mx-4 mb-2" />
        <Skeleton className="h-12 mx-4 mb-2" />
        <Skeleton className="h-12 mx-4 mb-2" />
      </>
    );
  }

  return (
    <>
      {tasks.length === 0 ? (
        <div className="text-sm text-slate-500 text-center mt-6">
          add some tasks!
        </div>
      ) : (
        tasks.map(
          (
            task: {
              title: string;
              description: string;
              status: "Pending" | "In Progress" | "Completed";
              priority: "low" | "medium" | "high";
              id: number;
            },
            index: number
          ) => {
            return <TaskCard task={task} key={index} />;
          }
        )
      )}
    </>
  );
}

export default TaskList;
