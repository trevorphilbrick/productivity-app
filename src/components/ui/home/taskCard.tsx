"use client";
import { Card } from "../card";
import { useState, useContext, useRef } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import ProgressPill from "./progressPill";
import { deleteTask, updateStatus } from "@/lib/data";
import { TaskContext } from "@/context/taskContext";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import clsx from "clsx";
import { Task } from "@/lib/types";
import DeletePopover from "./confirmDeletePopover";
import { useIsVisible } from "@/hooks/useIsVisible";

const Priority = ({
  priority,
  className,
}: {
  priority: string;
  className?: string;
}) => {
  switch (priority) {
    case "low":
      return <FcLowPriority className={`${className}`} />;
    case "medium":
      return <FcMediumPriority className={`${className}`} />;
    case "high":
      return <FcHighPriority className={`${className}`} />;
    default:
      return <FcLowPriority className={`${className}`} />;
  }
};

function TaskCard({
  task,
  key,
  posIndex,
}: {
  task: Task;
  key: number;
  posIndex: number;
}) {
  const { setTasks, tasks } = useContext(TaskContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const taskRef = useRef(null);

  const isVisible = useIsVisible(taskRef);

  const handleNextStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return "In Progress";
      case "In Progress":
        return "Completed";
      case "Completed":
        return "Pending";
      default:
        return "Pending";
    }
  };

  const handleClick = async (status: string) => {
    await updateStatus(task.id, status).then((res) => {
      setTasks(
        [
          res.updatedTask.rows[0],
          ...tasks.filter((t) => t.id !== task.id),
        ].sort((a, b) => a.id - b.id)
      );
    });
  };

  const handleDelete = () => {
    deleteTask(task.id).then((res) => {
      setTasks(res.tasks.rows);
    });
  };

  return (
    // card container div
    <div
      style={{ transitionDelay: posIndex * 100 + "ms" }}
      className={clsx(
        "p-4 animate-all duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      ref={taskRef}
    >
      {/* collapsed content div */}
      <div key={key} className=" flex justify-between items-center ">
        {/* left container */}
        <div className="flex items-center mr-4">
          <p
            className={clsx(
              "mr-2  text-ellipses",
              !isExpanded && "line-clamp-1"
            )}
          >
            {task.title}
          </p>
          <Priority priority={task.priority} />
        </div>
        {/* right container */}
        <div className="flex items-center">
          <ProgressPill
            status={task.status}
            onClick={handleClick}
            handleNextStatus={handleNextStatus}
            className="mr-2"
          />
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className={clsx(
              "mr-2 transition-all hover:text-slate-500 text-lg",
              isExpanded && "rotate-180"
            )}
          >
            <RxChevronDown />
          </button>
          <DeletePopover onDelete={handleDelete} />
        </div>
      </div>
      {/* expanded content */}
      {isExpanded && (
        <div className="mt-2">
          <p className="text-sm">{task.description}</p>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
