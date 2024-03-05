import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/signin");
  }
  redirect("/dashboard/tasks");
}

export default Page;
