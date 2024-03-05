import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes =
    await sql`SELECT * FROM notes WHERE User_id = ${user?.username};`;
  return NextResponse.json({ notes }, { status: 200 });
}
