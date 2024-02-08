import Weather from "@/components/ui/home/weather";
import Events from "@/components/ui/home/events";
import { flags } from "@/lib/flags";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen  md:flex md:flex-col md:items-center ">
      <div className="flex flex-col items-center md:items-start md:flex-row md:w-11/12 lg:4/5 max-w-6xl mt-6">
        {flags.shouldShowEvents && <Events />}
        <div className="flex-1 px-4">{children}</div>
        {flags.shouldShowWeather && <Weather />}
      </div>
    </div>
  );
}

export default layout;
