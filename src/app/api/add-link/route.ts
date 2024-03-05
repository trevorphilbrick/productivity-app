import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { user } = await validateRequest();
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const linkUrl = searchParams.get("linkUrl");

  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!title || !linkUrl) throw new Error("Missing required fields.");
    await sql`INSERT INTO quicklinks (Linktitle, Linkurl, User_id) VALUES (${title}, ${linkUrl}, ${user.username});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const quicklinks = await sql`SELECT * FROM quicklinks;`;
  return NextResponse.json({ quicklinks }, { status: 200 });
}
