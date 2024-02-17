import { Button } from "@/components/ui/button";
import { RxPlus } from "react-icons/rx";
import { Card } from "@/components/ui/card";

function Page() {
  return (
    <div>
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
      <div className="flex  px-4  ">
        <div className="w-36 min-w-36">
          <Card className="h-24 text-sm p-4 mb-4">Hello World</Card>
          <Card className="h-16 text-sm p-4 mb-4">Hello World</Card>
          <Card className="h-32 text-sm p-4 mb-4">Hello World</Card>
        </div>
        <div className="ml-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">NoteMaster Pro</h2>
            <div className="flex">
              <Button className=" mr-2">edit</Button>
              <Button variant="destructive">delete</Button>
            </div>
          </div>
          <Card className="p-6 ">
            NoteMaster Pro is the ultimate note-taking app designed for busy
            professionals, students, and anyone in between who values
            organization and efficiency. With its sleek, user-friendly
            interface, NoteMaster Pro transforms the way you capture, organize,
            and share information. Whether you're jotting down quick reminders,
            compiling detailed research notes, or brainstorming for your next
            big project, this app has you covered.
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
