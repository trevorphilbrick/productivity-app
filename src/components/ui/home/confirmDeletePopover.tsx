import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../button";
import { RxCross2 } from "react-icons/rx";

function DeletePopover({ onDelete }: { onDelete: () => void }) {
  return (
    <Popover>
      <PopoverTrigger>
        <RxCross2 />
      </PopoverTrigger>
      <PopoverContent className="w-auto flex items-center">
        <p className="mr-4">Are you sure?</p>
        <Button onClick={() => onDelete()} variant="destructive">
          Yes
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default DeletePopover;
