import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  try {
    if (!title || !description || !status || !priority)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO todos (Title, Description, Status, Priority) VALUES (${title}, ${description}, ${status}, ${priority});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM todos;`;
  return NextResponse.json({ tasks }, { status: 200 });
}
