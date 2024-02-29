import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const body = await request.json();
  const { noteTitle, noteBody } = body;

  const isEdited = true;
  const timeStamp = new Date().toLocaleString();

  const updatedTask =
    await sql`UPDATE notes SET Notetitle = ${noteTitle}, Notebody = ${noteBody}, Timestamp = ${timeStamp}, IsEdited=${isEdited} WHERE id = ${id?.toString()} RETURNING *;`;

  return NextResponse.json({ note: updatedTask }, { status: 200 });
}
