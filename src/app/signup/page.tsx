import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";

import SignUpForm from "@/components/ui/home/signUpForm";
import { addUser } from "@/lib/data";

export default function Page() {
  return (
    <div className="flex mt-12 justify-center ">
      <SignUpForm signup={signup} />
    </div>
  );
}

async function signup(data: {
  username: string;
  password: string;
}): Promise<ActionResult> {
  "use server";
  const username = data.username;
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = data.password;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const userId = generateId(15);

  // TODO:Check if username is already taken and return error if it is

  const addUserResponse = await addUser(userId, username, password);

  if (addUserResponse.status !== 200) {
    return {
      error: "Failed to create user",
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard");
}

interface ActionResult {
  error: string;
}
