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

  await sql`DELETE FROM quicklinks WHERE id = ${id?.toString()}`;

  const quicklinks = await sql`SELECT * FROM quicklinks;`;
  return NextResponse.json({ quicklinks }, { status: 200 });
}
