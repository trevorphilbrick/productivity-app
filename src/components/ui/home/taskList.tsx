"use client";
import TaskCard from "./taskCard";
import { fetchTasks } from "@/lib/data";
import { useEffect, useContext } from "react";
import { TaskContext } from "@/context/taskContext";

function TaskList() {
  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks().then((data) => {
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