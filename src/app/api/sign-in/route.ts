import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { verifyPassword } from "../utils";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();

  const username = body.username;
  const password = body.password;

  const user = (await sql`SELECT * FROM users WHERE username = ${username};`)
    .rows[0];

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const isVerified = await verifyPassword(password, user.password);

  if (!isVerified) {
    return NextResponse.json(
      {
        error: "Authentication failed",
        message: "Invalid email or password.",
      },
      { status: 401 }
    );
  }

  if (isVerified) {
    const { password, ...safeUser } = user;
    let jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "30d",
      }
    );
    return NextResponse.json(
      { user: safeUser, token: jwtToken },
      { status: 200 }
    );
  }
}
