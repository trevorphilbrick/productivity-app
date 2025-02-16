import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <main>
      <div className="bg-[url(https://5ftd8mwqickudvmi.public.blob.vercel-storage.com/Gradient-4kKNDqrDamDqgIp47BgNd54TLgJV9T.png)] bg-cover bg-center bg-no-repeat rounded-md py-24 container mx-auto mb-16">
        <h1 className=" text-5xl md:text-6xl lg:text-7xl text-center  font-semibold lg:mx-24 mb-4">
          Unlock A Productivity Powerhouse
        </h1>
        <p className="text-center text-xl">
          Note Taking | Task Tracking | Link Saving
        </p>
      </div>
      <div className="w-full  h-64  inset-shadow bg-[url(/grid-mobile.png)] bg-cover bg-center bg-no-repeat md:bg-[url(/grid-desktop.png)]">
        <div className="container mx-auto"></div>
      </div>
    </main>
  );
}
