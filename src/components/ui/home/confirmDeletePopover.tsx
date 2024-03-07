"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../button";
import { RxCross2 } from "react-icons/rx";

function DeletePopover({
  onDelete,
  className,
  hoverColor,
}: {
  onDelete: () => void;
  className?: string;
  hoverColor?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger className={`${className}`}>
        <RxCross2
          className={`hover:text-slate-500 transition-all active:scale-50 ${hoverColor}`}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto flex items-center">
        <p className={`mr-4 `}>Are you sure?</p>
        <Button onClick={() => onDelete()} variant="destructive">
          Yes
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default DeletePopover;
