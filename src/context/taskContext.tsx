import { useState, createContext } from "react";
import { Todo, MyContextType } from "@/lib/types";

export const TaskContext = createContext<MyContextType>({
  tasks: [],
  setTasks: () => {},
});

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Todo[]>([]);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
