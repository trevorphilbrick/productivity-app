import React from "react";
import Weather from "@/components/ui/home/weather";
import Events from "@/components/ui/home/events";
import { Sheet } from "@/components/ui/sheet";
import AddTaskForm from "@/components/ui/home/addTaskForm";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sheet>
      <div className="w-screen  md:flex md:flex-col md:items-center ">
        <div className="bg-blue-500 w-screen">nav</div>
        <div className="flex flex-col items-center md:items-start md:flex-row md:w-11/12 lg:4/5 max-w-6xl mt-6">
          <Events />
          <div className="flex-1 px-4">{children}</div>
          <Weather />
        </div>
      </div>
      <AddTaskForm />
    </Sheet>
  );
}

export default layout;
