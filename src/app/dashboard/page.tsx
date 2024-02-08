import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return <div>DASHBOARD</div>;
}

export default Page;
