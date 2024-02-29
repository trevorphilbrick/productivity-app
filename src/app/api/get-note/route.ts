import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("userId");
  const id = searchParams.get("id");

  const note =
    await sql`SELECT * FROM notes WHERE User_id = ${user_id} AND Id = ${id};`;
  return NextResponse.json({ note }, { status: 200 });
}
