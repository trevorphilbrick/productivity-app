"use client";
import { RxPlus } from "react-icons/rx";
import { SheetTrigger } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import AddTaskForm from "@/components/ui/home/addTaskForm";
import TaskProvider from "@/context/taskContext";
import TaskList from "@/components/ui/home/taskList";
import { textContent } from "@/lib/textContent";

function Page() {
  return (
    <TaskProvider>
      <Sheet>
        <div className="flex justify-between items-center py-3 px-4 mb-4 bg-[url('https://5ftd8mwqickudvmi.public.blob.vercel-storage.com/Gradient-4kKNDqrDamDqgIp47BgNd54TLgJV9T.png')] bg-center bg-cover rounded-sm text-white shadow-md dark:shadow-neutral-800  shadow-neutral-200">
          <h1 className="font-semibold text-lg">
            {textContent.tasks.taskSectionHeader}
          </h1>

          <SheetTrigger className="flex items-center text-sm">
            {textContent.tasks.taskSectionAddButton}
            <RxPlus className="ml-1" />
          </SheetTrigger>
        </div>
        <div>
          <TaskList />
        </div>
        <AddTaskForm />
      </Sheet>
    </TaskProvider>
  );
}

export default Page;
