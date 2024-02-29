export type Task = {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  id: number;
  priority: "low" | "medium" | "high";
};

export type Quicklink = {
  linktitle: string;
  linkurl: string;
  id: number;
};

export type Note = {
  notetitle: string;
  notebody: string;
  timestamp: string;
  id: number;
  isEdited: boolean | null;
};

export type MyContextType = {
  tasks: Task[]; // Adjust the type according to your state's structure
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // This matches the signature of the setState function provided by useState
};

export type QuicklinkContextType = {
  quicklinks: Quicklink[]; // Adjust the type according to your state's structure
  setQuicklinks: React.Dispatch<React.SetStateAction<Quicklink[]>>; // This matches the signature of the setState function provided by useState
};
