import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";
import { neon } from "@neondatabase/serverless";
// @ts-ignore -- this will be present in environment
const sql = neon(process.env.POSTGRES_URL);

export const adapter = new NeonHTTPAdapter(sql, {
  user: "auth_user",
  session: "user_session",
});
