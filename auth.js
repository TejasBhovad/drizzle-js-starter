import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
const sql = neon(process.env.NEXT_PUBLIC_NEON_DATABASE_URL);
const db = drizzle(sql);

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db),
  pages: { signIn: "/auth/signin" },
});
