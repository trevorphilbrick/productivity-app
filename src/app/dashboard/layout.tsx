import Weather from "@/components/ui/home/weather";
import Events from "@/components/ui/home/events";
import { flags } from "@/lib/flags";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { RxCheckCircled, RxPaperPlane, RxPencil2 } from "react-icons/rx";

const dashboardData = [
  {
    title: "Tasks",
    link: "/dashboard/tasks",
    iconComponent: <RxCheckCircled />,
  },
  {
    title: "Quick-links",
    link: "/dashboard/quicklinks",
    iconComponent: <RxPaperPlane />,
  },
  {
    title: "Notes",
    link: "/dashboard/notes",
    iconComponent: <RxPencil2 />,
  },
];

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen  md:flex md:flex-col md:items-center ">
      <div className="flex flex-col items-center md:items-start md:flex-row md:w-11/12 lg:4/5 max-w-6xl mt-6">
        {flags.shouldShowEvents && <Events />}
        {flags.shouldShowDashboardLinks && (
          <div className="flex flex-col w-full px-4 md:w-64 mb-6 md:mb-0">
            <h1 className="mb-4 font-bold text-2xl text-blue-500">Dashboard</h1>
            <nav className="flex flex-row md:flex-col">
              {dashboardData.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className=" group hover:bg-gray-100 dark:hover:bg-slate-800 "
                >
                  <div className="flex items-center py-4 px-4 group-hover:animate-pulse">
                    {item.iconComponent}
                    <p className="ml-2">{item.title}</p>
                  </div>
                  <Separator />
                </Link>
              ))}
            </nav>
          </div>
        )}
        <div className="flex-1 px-4">{children}</div>
        {flags.shouldShowWeather && <Weather />}
      </div>
    </div>
  );
}

export default layout;
