import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await sql`SELECT * FROM todos;`;
  return NextResponse.json({ tasks }, { status: 200 });
}
