import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInForm from "@/components/ui/home/signInForm";
import { getUser } from "@/lib/data";
import argon2 from "argon2";

function Page() {
  return (
    <div className="flex  justify-center mt-12">
      <SignInForm login={login} />
    </div>
  );
}

export default Page;

async function login(data: {
  username: string;
  password: string;
}): Promise<ActionResult> {
  "use server";
  const username = data.username;
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
  // TODO:Check if username is in database
  const { user: existingUser } = await getUser(username);

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  // TODO:fetch and compare password
  const validPassword = await argon2.verify(
    existingUser.hashed_password,
    password
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
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
