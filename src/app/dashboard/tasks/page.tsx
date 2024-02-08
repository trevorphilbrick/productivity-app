"use client";
import { RxPlus } from "react-icons/rx";
import { SheetTrigger } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import AddTaskForm from "@/components/ui/home/addTaskForm";
import TaskProvider from "@/context/taskContext";
import TaskList from "@/components/ui/home/taskList";

function Page() {
  return (
    <TaskProvider>
      <Sheet>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg mb-4">Tasks</h1>
          <SheetTrigger className="flex items-center text-sm">
            add
            <RxPlus className="ml-1" />
          </SheetTrigger>
        </div>
        <TaskList />
        <AddTaskForm />
      </Sheet>
    </TaskProvider>
  );
}

export default Page;
