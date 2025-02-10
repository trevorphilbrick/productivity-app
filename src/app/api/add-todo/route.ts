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
    if (!title || !status || !priority)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO todos (Title, Description, Status, Priority, UserId) VALUES (${title}, ${
      description || null
    }, ${status}, ${priority}, ${user.username});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tasks = await sql`SELECT * FROM todos;`;
  return NextResponse.json({ tasks }, { status: 200 });
}

// [
//   {
//     "title": "Allow No Description On Tasks",
//     "description": "Currently, the add task section requires a description. Make it possible to leave blank. ",
//     "status": "Pending",
//     "priority": "low",
//     "id": 60,
//     "user_id": null,
//     "userid": "trevorphilbrick"
//   },
//   {
//     "title": "Change sheet appearance ",
//     "description": "Update sheet appearance to match the new color scheme/ design",
//     "status": "Pending",
//     "priority": "high",
//     "id": 74,
//     "user_id": null,
//     "userid": "trevorphilbrick"
//   }
// ]
