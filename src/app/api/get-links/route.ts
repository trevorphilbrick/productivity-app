import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("userId");

  const quicklinks =
    await sql`SELECT * FROM quicklinks WHERE User_id = ${user_id};`;
  return NextResponse.json({ quicklinks }, { status: 200 });
}
