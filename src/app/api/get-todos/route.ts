import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks =
    await sql`SELECT * FROM todos WHERE UserId = ${user?.username};`;
  return NextResponse.json({ tasks }, { status: 200 });
}
