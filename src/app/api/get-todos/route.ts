import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("userId");

  const tasks = await sql`SELECT * FROM todos WHERE UserId = ${user_id};`;
  return NextResponse.json({ tasks }, { status: 200 });
}
