"use client";
import TaskCard from "./taskCard";
import { fetchTasks } from "@/lib/data";
import { useEffect, useContext } from "react";
import { TaskContext } from "@/context/taskContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function TaskList() {
  const { data: session } = useSession();
  const { tasks, setTasks } = useContext(TaskContext);

  if (!session) {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    if (!session?.user?.name) return; // handle no user
    fetchTasks(session?.user?.name).then((data) => {
      setTasks(data.tasks.rows);
    });
  }, []);

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
