import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user } = await validateRequest();
  const { searchParams } = new URL(request.url);
  const res = await request.json();

  const noteTitle = searchParams.get("noteTitle");
  const noteBody = res.noteBody;
  const timeStamp = new Date().toLocaleString();

  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!noteTitle || !noteBody || !timeStamp)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO notes (NoteTitle, NoteBody, TimeStamp, User_id) VALUES (${noteTitle}, ${noteBody}, ${timeStamp}, ${user.username});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 201 });
}
