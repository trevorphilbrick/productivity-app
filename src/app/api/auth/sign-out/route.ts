import { logout } from "@/lib/auth";

export async function GET(request: Request) {
  await logout();
  return {
    status: 200,
    body: { message: "Logged out" },
  };
}
