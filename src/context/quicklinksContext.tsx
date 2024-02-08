import { useState, createContext } from "react";
import { Todo, QuicklinkContextType, Quicklink } from "@/lib/types";

export const QuicklinkContext = createContext<QuicklinkContextType>({
  tasks: [],
  setTasks: () => {},
});

export default function QuicklinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Quicklink[]>([]);
  return (
    <QuicklinkContext.Provider value={{ tasks, setTasks }}>
      {children}
    </QuicklinkContext.Provider>
  );
}
