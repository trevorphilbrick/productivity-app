import { Skeleton } from "../../skeleton";

function TaskListSkeleton() {
  return (
    <>
      <Skeleton className="h-12 mx-4 mb-2" />
      <Skeleton className="h-12 mx-4 mb-2" />
      <Skeleton className="h-12 mx-4 mb-2" />
      <Skeleton className="h-12 mx-4 mb-2" />
    </>
  );
}

export default TaskListSkeleton;
