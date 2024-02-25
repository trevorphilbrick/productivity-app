"use client";
import { Card } from "../card";
import { useState, useContext } from "react";
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

const statuses = ["Pending", "In Progress", "Completed"];

function TaskCard({ task, key }: { task: Task; key: number }) {
  const { setTasks, tasks } = useContext(TaskContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = useState(false);

  const renderPriority = (priority: string) => {
    switch (priority) {
      case "low":
        return <FcLowPriority className="mr-4" />;
      case "medium":
        return <FcMediumPriority className="mr-4" />;
      case "high":
        return <FcHighPriority className="mr-4" />;
      default:
        return <FcLowPriority className="mr-4" />;
    }
  };

  const handleClick = async (status: string) => {
    if (!isStatusExpanded) {
      setIsStatusExpanded(true);
    } else {
      if (status === task.status) return setIsStatusExpanded(false);
      await updateStatus(task.id, status).then((res) => {
        setTasks(
          [
            res.updatedTask.rows[0],
            ...tasks.filter((t) => t.id !== task.id),
          ].sort((a, b) => a.id - b.id)
        );
      });
      setIsStatusExpanded(false);
    }
  };

  const handleDelete = () => {
    deleteTask(task.id).then((res) => {
      setTasks(res.tasks.rows);
    });
  };

  return (
    <Card
      key={key}
      className={clsx(
        "mb-2 py-2 px-4 mx-4"
        // animate card opening
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="mr-2 line-clamp-1 text-ellipses">{task.title}</h1>
          {renderPriority(task.priority)}
        </div>
        <div className="flex">
          <div className="relative">
            <div className="absolute right-0 flex bg-white dark:bg-black">
              <div
                className={clsx(
                  "flex flex-row items-center transition-all ease-in-out ",
                  isStatusExpanded ? "w-auto" : setTimeout(() => "w-0", 400)
                )}
              >
                {statuses
                  .filter((status) => status !== task.status)
                  .map((status) => (
                    <ProgressPill
                      status={status}
                      key={status}
                      onClick={handleClick}
                      className={clsx(
                        "transition-opacity delay-100 duration-200 ease-in-out",
                        !isStatusExpanded && "opacity-0",
                        isStatusExpanded && " opacity-100"
                      )}
                    />
                  ))}
              </div>
              <ProgressPill status={task.status} onClick={handleClick} />
            </div>
          </div>
          <DeletePopover onDelete={handleDelete} />
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
