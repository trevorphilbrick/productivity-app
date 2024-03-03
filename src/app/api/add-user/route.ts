import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { hashPassword } from "../utils";

export async function POST(request: Request) {
  const body = await request.json();

  const { username, email, password } = body;

  const hashedPassword = await hashPassword(password);

  try {
    if (!username || !email || !hashedPassword) {
      throw new Error("Missing required fields.");
    }
    await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: 200 });
}