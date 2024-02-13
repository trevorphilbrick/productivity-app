import { useState, createContext } from "react";
import { QuicklinkContextType, Quicklink } from "@/lib/types";

export const QuicklinkContext = createContext<QuicklinkContextType>({
  quicklinks: [],
  setQuicklinks: () => {},
});

export default function QuicklinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quicklinks, setQuicklinks] = useState<Quicklink[]>([]);
  return (
    <QuicklinkContext.Provider value={{ quicklinks, setQuicklinks }}>
      {children}
    </QuicklinkContext.Provider>
  );
}
