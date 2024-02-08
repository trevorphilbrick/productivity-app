import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const user_id = searchParams.get("user_id");

  try {
    if (!title || !description || !status || !priority || !user_id)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO todos (Title, Description, Status, Priority, User_id) VALUES (${title}, ${description}, ${status}, ${priority}, ${user_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM todos;`;
  return NextResponse.json({ tasks }, { status: 200 });
}
