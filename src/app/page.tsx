import Image from "next/image";
import { Button } from "@/components/ui/button";
import blackMobile from "../../public/mobile-black.png";
import blackDesktop from "../../public/3-devices-black.png";

export default async function Home() {
  return (
    <main className="flex flex-col items-center text-wrap">
      <div className="flex flex-col md:flex-row w-full md:mx-8 max-w-screen-xl px-4 ">
        <div className=" mb-4 md:w-96 md:mb-0 ">
          <h1 className=" text-5xl md:text-6xl mb-4">
            Unlock Your Productivity Powerhouse!
          </h1>
          <p className="text-slate-600 mb-8">
            From jotting down spontaneous ideas to managing complex projects,
            this is your go-to for staying organized and ahead of the curve.
          </p>
          <Button className="w-full">Join Now</Button>
        </div>
        <Image src={blackMobile} alt="black mobile" className="md:hidden" />
        <Image
          src={blackDesktop}
          alt="black desktop"
          className="hidden md:block"
        />
      </div>
    </main>
  );
}
