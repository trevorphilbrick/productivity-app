import { validateRequest } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user } = await validateRequest();
  const body = await request.json();

  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await sql`INSERT INTO password_reset_tokens (User_id, Id, Expires_at) VALUES (${user.id}, ${body.id}, ${body.expiresAt});`;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
