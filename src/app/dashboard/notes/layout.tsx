import { Button } from "@/components/ui/button";
import { RxPlus } from "react-icons/rx";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mb-4">
      <div className="flex  px-4 justify-between items-center w-screen md:w-auto ">
        <h1 className="font-semibold text-lg mb-4">Notes</h1>
        <Button
          variant="ghost"
          className="flex items-center text-sm p-0 hover:bg-transparent font-normal"
        >
          add
          <RxPlus className="ml-1" />
        </Button>
      </div>
      {children}
    </div>
  );
}

export default layout;
