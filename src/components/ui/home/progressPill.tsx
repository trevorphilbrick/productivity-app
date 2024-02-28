import clsx from "clsx";
import { RxArrowRight } from "react-icons/rx";

function ProgressPill({
  status,
  className,
  onClick: handleClick,
  handleNextStatus,
}: {
  status: string;
  className?: string;
  onClick: (status: string) => void;
  handleNextStatus: (status: string) => string;
}) {
  const color = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200";
      case "In Progress":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      className={clsx(
        `group ${color()} flex items-center justify-center md:hover:justify-evenly text-xs  py-1 rounded-full text-center  dark:text-slate-700 text-nowrap cursor-pointer ${className} transition-all`,
        status === "In Progress" && "w-20 hover:w-24",
        status === "Pending" && "w-16 hover:w-20",
        status === "Completed" && "w-20 hover:w-24"
      )}
      onClick={() => handleClick(handleNextStatus(status))}
    >
      {status}
      <RxArrowRight className="w-0 transition-all md:group-hover:w-auto" />
    </div>
  );
}

export default ProgressPill;

// unexpanded widths:
// in progress = 80px
// pending = 63px
// completed = 79px
