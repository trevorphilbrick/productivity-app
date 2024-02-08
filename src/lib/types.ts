export type Todo = {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  id: number;
  priority: "Low" | "Medium" | "High";
};

export type Quicklink = {
  linkTitle: string;
  linkUrl: string;
  id: number;
};

export type MyContextType = {
  tasks: Todo[]; // Adjust the type according to your state's structure
  setTasks: React.Dispatch<React.SetStateAction<Todo[]>>; // This matches the signature of the setState function provided by useState
};

export type QuicklinkContextType = {
  tasks: Quicklink[]; // Adjust the type according to your state's structure
  setTasks: React.Dispatch<React.SetStateAction<Quicklink[]>>; // This matches the signature of the setState function provided by useState
};
