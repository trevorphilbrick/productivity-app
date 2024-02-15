function ProgressPill({
  status,
  className,
  onClick,
}: {
  status: string;
  className?: string;
  onClick: (status: string) => void;
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
      className={`${color()} text-xs px-2 py-1 rounded-full mr-2 dark:text-slate-700 text-nowrap cursor-pointer ${className}`}
      onClick={() => onClick(status)}
    >
      {status}
    </div>
  );
}

export default ProgressPill;
