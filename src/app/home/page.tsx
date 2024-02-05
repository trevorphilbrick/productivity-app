"use client";
import { createContext, useEffect, useState } from "react";
import TaskCard from "@/components/ui/home/taskCard";
import { RxPlus } from "react-icons/rx";
import { SheetTrigger } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import AddTaskForm from "@/components/ui/home/addTaskForm";
import { Todo, MyContextType } from "@/lib/types";
import { fetchTasks } from "@/lib/data";

export const TaskContext = createContext<MyContextType>({
  tasks: [],
  setTasks: () => {},
});

function Page() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTasks().then((data) => {
      console.log(data);
      setTasks(data.tasks.rows);
    });
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <Sheet>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg mb-4">Tasks</h1>
          <SheetTrigger className="flex items-center text-sm">
            add
            <RxPlus className="ml-1" />
          </SheetTrigger>
        </div>
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
        <AddTaskForm />
      </Sheet>
    </TaskContext.Provider>
  );
}

export default Page;
