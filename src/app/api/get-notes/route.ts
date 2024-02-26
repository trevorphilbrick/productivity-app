import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("userId");

  console.log("user_id", user_id);

  const notes = await sql`SELECT * FROM notes WHERE User_id = ${user_id};`;
  return NextResponse.json({ notes }, { status: 200 });
}
