"use client";
import { RxPlus } from "react-icons/rx";
import { SheetTrigger } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import AddTaskForm from "@/components/ui/home/addTaskForm";
import TaskProvider from "@/context/taskContext";
import TaskList from "@/components/ui/home/taskList";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { textContent } from "@/lib/textContent";
import { ToastAction } from "@/components/ui/toast";

function Page() {
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Want Reminders?",
        description: "Enable notifications to get daily reminders!",
        action: (
          <ToastAction
            altText="Enable notifications"
            onClick={() => {
              Notification.requestPermission().then((result) => {
                if (result === "granted") {
                  toast({
                    title: "Notifications Enabled",
                    description: "You will now receive daily reminders!",
                  });
                }
              });
            }}
          >
            Enable
          </ToastAction>
        ),
      });
    }, 3000);
  }, []);

  return (
    <TaskProvider>
      <Sheet>
        <div className="flex justify-between items-center  px-4 justify-between items-center w-screen md:w-auto">
          <h1 className="font-semibold text-lg mb-4">
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
