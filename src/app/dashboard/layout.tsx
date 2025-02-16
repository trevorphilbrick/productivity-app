import Weather from "@/components/ui/home/weather";
import Events from "@/components/ui/home/events";
import { flags } from "@/lib/flags";
import DashNav from "@/components/ui/dashnav";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto">
      <DashNav />
      <div className="flex flex-col items-center md:items-start md:flex-row ">
        {flags.shouldShowEvents && <Events />}

        <div className=" w-full">{children}</div>
        {flags.shouldShowWeather && <Weather />}
      </div>
    </div>
  );
}

export default layout;
