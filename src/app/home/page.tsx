import TaskCard from "@/components/ui/home/taskCard";
import { RxPlus } from "react-icons/rx";
import { SheetTrigger } from "@/components/ui/sheet";

type Todo = {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
};

const todoData: Todo[] = [
  {
    title: "Complete project proposal draft",
    description:
      "Finish the first draft of the project proposal for the upcoming client project.",
    status: "In Progress",
  },
  {
    title: "Review team's weekly progress reports",
    description:
      "Go through the weekly reports submitted by the team to assess progress and identify any issues.",
    status: "Completed",
  },
  {
    title: "Prepare slides for Monday's presentation",
    description:
      "Create a PowerPoint presentation for Monday's meeting with stakeholders.",
    status: "In Progress",
  },
  {
    title: "Update project timeline and milestones",
    description:
      "Revise the project timeline based on the latest progress and set new milestones.",
    status: "In Progress",
  },
  {
    title: "Call mom to check in",
    description:
      "Make a phone call to mom to catch up and see how she's doing.",
    status: "Pending",
  },
  {
    title: "Book dentist appointment for next month",
    description: "Schedule a dental check-up for next month.",
    status: "Pending",
  },
  {
    title: "Sort through old clothes for donation",
    description:
      "Organize old clothes to decide what to keep and what to donate.",
    status: "Completed",
  },
  {
    title: "Plan weekend trip with friends",
    description: "Coordinate with friends to plan a weekend getaway.",
    status: "Completed",
  },
  {
    title: "Sign up for the local 5K run",
    description:
      "Register for the 5K run happening in the local community next month.",
    status: "Pending",
  },
  {
    title: "Meal prep for the week",
    description:
      "Prepare meals in advance for the upcoming week to ensure healthy eating.",
    status: "Pending",
  },
  {
    title: "Schedule yearly physical examination",
    description: "Book an appointment for the annual physical check-up.",
    status: "Pending",
  },
  {
    title: "Research new yoga classes to join",
    description: "Look for new yoga classes in the area to join for fitness.",
    status: "Pending",
  },
  {
    title: "Finish reading 'Creative Confidence'",
    description:
      "Complete reading the book 'Creative Confidence' to enhance creativity skills.",
    status: "Pending",
  },
  {
    title: "Enroll in online course on data analysis",
    description:
      "Sign up for an online course to improve data analysis skills.",
    status: "Pending",
  },
  {
    title: "Watch tutorial on advanced Excel functions",
    description: "Watch a video tutorial to learn advanced functions in Excel.",
    status: "Pending",
  },
  {
    title: "Practice coding for 30 minutes daily",
    description:
      "Dedicate 30 minutes every day to practice coding and improve programming skills.",
    status: "Pending",
  },
];

function Page() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg mb-4">Tasks</h1>
        <SheetTrigger className="flex items-center text-sm">
          add
          <RxPlus className="ml-1" />
        </SheetTrigger>
      </div>
      {todoData.map(
        (
          todo: {
            title: string;
            description: string;
            status: "Pending" | "In Progress" | "Completed";
          },
          index: number
        ) => {
          return <TaskCard todo={todo} key={index} />;
        }
      )}
    </>
  );
}

export default Page;
