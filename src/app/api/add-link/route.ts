import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const linkUrl = searchParams.get("linkUrl");
  const user_id = searchParams.get("userId");

  try {
    if (!title || !linkUrl || !user_id)
      throw new Error("Missing required fields.");
    await sql`INSERT INTO quicklinks (Linktitle, Linkurl, User_id) VALUES (${title}, ${linkUrl}, ${user_id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const quicklinks = await sql`SELECT * FROM quicklinks;`;
  return NextResponse.json({ quicklinks }, { status: 200 });
}
