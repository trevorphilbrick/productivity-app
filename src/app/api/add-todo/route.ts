import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await validateRequest();
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!title || !description || !status || !priority)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO todos (Title, Description, Status, Priority, UserId) VALUES (${title}, ${description}, ${status}, ${priority}, ${user.username});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM todos;`;
  return NextResponse.json({ tasks }, { status: 200 });
}
