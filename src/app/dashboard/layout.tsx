import Weather from "@/components/ui/home/weather";
import Events from "@/components/ui/home/events";
import { flags } from "@/lib/flags";
import { Card } from "@/components/ui/card";
import Link from "next/link";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen  md:flex md:flex-col md:items-center ">
      <div className="flex flex-col items-center md:items-start md:flex-row md:w-11/12 lg:4/5 max-w-6xl mt-6">
        {flags.shouldShowEvents && <Events />}
        <div className="flex flex-col w-full px-4  md:w-64">
          <h1 className="mb-4 font-bold text-xl">Dashboard</h1>
          <nav className="flex flex-col">
            <Link href="/dashboard/tasks">
              <Card className=" p-3 mb-2">Tasks</Card>
            </Link>
            <Link href="/dashboard/quicklinks">
              <Card className=" p-3 mb-2 ">Quick-links</Card>
            </Link>
            <Link href="/dashboard/notes">
              <Card className=" p-3 mb-2 ">Notes</Card>
            </Link>
          </nav>
        </div>
        <div className="flex-1 px-4">{children}</div>
        {flags.shouldShowWeather && <Weather />}
      </div>
    </div>
  );
}

export default layout;
