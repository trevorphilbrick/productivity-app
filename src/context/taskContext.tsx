import { useState, createContext } from "react";
import { Task, MyContextType } from "@/lib/types";

export const TaskContext = createContext<MyContextType>({
  tasks: [],
  setTasks: () => {},
});

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
