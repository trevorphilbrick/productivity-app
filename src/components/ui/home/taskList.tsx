"use client";
import TaskCard from "./taskCard";
import { fetchTasks } from "@/lib/data";
import { useContext, useState, useEffect } from "react";
import { TaskContext } from "@/context/taskContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import TaskListSkeleton from "./loaders/taskListSkeleton";
import { Task } from "@/lib/types";
import { textContent } from "@/lib/textContent";

function TaskList() {
  const { data: session } = useSession();
  const { tasks, setTasks } = useContext(TaskContext);

  const [loading, setLoading] = useState(true);

  // if there is no user session, take the user to sign-in
  if (!session) {
    redirect("/auth/signin");
  }

  // safety check to only fetch if there is a user session
  useEffect(() => {
    if (!session?.user?.name) return;
    fetchTasks(session?.user?.name)
      .then((data) => {
        setTasks(data.tasks.rows.sort((a: any, b: any) => a.id - b.id));
      })
      .then(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <TaskListSkeleton />;
  }

  return (
    <>
      {tasks.length === 0 ? (
        <div className="text-sm text-slate-500 text-center mt-6">
          {textContent.tasks.taskList.emptyTaskList}
        </div>
      ) : (
        <div className="divide-y">
          {tasks.map((task: Task, index: number) => {
            return <TaskCard task={task} key={index} posIndex={index} />;
          })}
        </div>
      )}
    </>
  );
}

export default TaskList;
