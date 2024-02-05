"use client";
import { Card } from "../card";
import { useState } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import ProgressPill from "./progressPill";

function TaskCard({
  todo,
  key,
}: {
  todo: {
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed";
  };
  key: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card key={key} className="mb-2 py-2 px-4">
      <div className="flex justify-between">
        <h1>{todo.title}</h1>
        <div className="flex">
          <ProgressPill status={todo.status} />
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <RxChevronUp /> : <RxChevronDown />}
          </button>
        </div>
      </div>
      {isExpanded && <p>{todo.description}</p>}
    </Card>
  );
}

export default TaskCard;
