"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxCheckCircled } from "react-icons/rx";
import { RxPaperPlane } from "react-icons/rx";
import { RxPencil2 } from "react-icons/rx";

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

function DashNav() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-x-6 mb-8 justify-between md:justify-start">
      {dashboardData.map((item) => (
        <Link
          href={item.link}
          key={item.title}
          className={`${pathname == item.link ? "font-bold" : ""}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default DashNav;
