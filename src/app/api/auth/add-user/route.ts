import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(request: Request) {
  const body = await request.json();
  const username = body.username;
  const password = body.password;
  const userId = body.userId;

  const hashedPassword = await argon2.hash(password);

  try {
    if (!username || !hashedPassword || !userId) {
      throw new Error("Missing required fields.");
    }
    await sql`INSERT INTO auth_user (id, username, hashed_password) VALUES (${userId}, ${username},  ${hashedPassword});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ status: 200 });
}
