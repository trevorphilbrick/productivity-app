import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const updatedTask =
    await sql`UPDATE todos SET status = ${status} WHERE id = ${id?.toString()} RETURNING *;`;

  return NextResponse.json({ updatedTask }, { status: 200 });
}
