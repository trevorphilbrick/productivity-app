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

  await sql`DELETE FROM notes WHERE id = ${id?.toString()}`;

  const notes = await sql`SELECT * FROM notes;`;
  return NextResponse.json({ notes }, { status: 200 });
}
