import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const res = await request.json();

  const noteTitle = searchParams.get("noteTitle");
  const noteBody = res.noteBody;
  const user_id = searchParams.get("user_id");
  const timeStamp = new Date().toLocaleString();

  try {
    if (!noteTitle || !noteBody || !user_id || !timeStamp)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO notes (NoteTitle, NoteBody, TimeStamp, User_id) VALUES (${noteTitle}, ${noteBody}, ${timeStamp}, ${user_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 201 });
}
