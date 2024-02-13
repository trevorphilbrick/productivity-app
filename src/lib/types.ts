export type Todo = {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  id: number;
  priority: "Low" | "Medium" | "High";
};

export type Quicklink = {
  linktitle: string;
  linkurl: string;
  id: number;
};

export type MyContextType = {
  tasks: Todo[]; // Adjust the type according to your state's structure
  setTasks: React.Dispatch<React.SetStateAction<Todo[]>>; // This matches the signature of the setState function provided by useState
};

export type QuicklinkContextType = {
  quicklinks: Quicklink[]; // Adjust the type according to your state's structure
  setQuicklinks: React.Dispatch<React.SetStateAction<Quicklink[]>>; // This matches the signature of the setState function provided by useState
};
