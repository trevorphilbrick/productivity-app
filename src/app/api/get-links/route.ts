import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await validateRequest();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("userId");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quicklinks =
    await sql`SELECT * FROM quicklinks WHERE User_id = ${user.username};`;
  return NextResponse.json({ quicklinks }, { status: 200 });
}
