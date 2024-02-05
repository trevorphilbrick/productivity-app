"use client";
import { Card } from "../card";
import { useState, useContext } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import ProgressPill from "./progressPill";
import { deleteTask } from "@/lib/data";
import { TaskContext } from "@/app/home/page";

function TaskCard({
  task,
  key,
}: {
  task: {
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed";
    id: number;
  };
  key: number;
}) {
  const { setTasks } = useContext(TaskContext);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card key={key} className="mb-2 py-2 px-4">
      <div className="flex justify-between">
        <h1>{task.title}</h1>
        <div className="flex">
          <ProgressPill status={task.status} />
          <button
            className="mr-2"
            onClick={() => {
              deleteTask(task.id).then((res) => {
                setTasks(res.tasks.rows);
              });
            }}
          >
            <RxCross2 />
          </button>
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <RxChevronUp /> : <RxChevronDown />}
          </button>
        </div>
      </div>
      {isExpanded && <p>{task.description}</p>}
    </Card>
  );
}

export default TaskCard;
