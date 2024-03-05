import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await validateRequest();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const note =
    await sql`SELECT * FROM notes WHERE User_id = ${user?.username} AND Id = ${id};`;
  return NextResponse.json({ note }, { status: 200 });
}
