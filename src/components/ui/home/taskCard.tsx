"use client";
import { Card } from "../card";
import { useState, useContext } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import ProgressPill from "./progressPill";
import { deleteTask } from "@/lib/data";
import { TaskContext } from "@/context/taskContext";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

function TaskCard({
  task,
  key,
}: {
  task: {
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed";
    priority: "low" | "medium" | "high";
    id: number;
  };
  key: number;
}) {
  const { setTasks } = useContext(TaskContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityStyles="mr-4"

  const renderPriority = (priority: string) => {
    console.log(priority);
    switch (priority) {
      case "low":
        return <FcLowPriority className={priorityStyles}/>;
      case "medium":
        return <FcMediumPriority className={priorityStyles}/>;
      case "high":
        return <FcHighPriority className={priorityStyles} />;
      default:
        return <FcLowPriority className={priorityStyles} />;
    }
  };
  return (
    <Card key={key} className="mb-2 py-2 px-4 mx-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="mr-2 line-clamp-1 text-ellipses">{task.title}</h1>
          {renderPriority(task.priority)}
        </div>
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
      {isExpanded && (
        <p className="text-sm text-slate-600">{task.description}</p>
      )}
    </Card>
  );
}

export default TaskCard;
