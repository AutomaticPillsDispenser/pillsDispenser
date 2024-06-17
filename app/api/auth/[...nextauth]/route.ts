import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await axios.post("http://localhost:8000/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        if (res.status == 200) {
          createCookie(JSON.stringify(res.data))
          return {
            email: credentials?.email,
            data: res.data,
          };
        }
        // Add logic here to look up the user from the credentials supplied
        return null;
      },
    }),
  ],
});

async function createCookie(data:string) {
  "use server";
  cookies().set("user", data);
}

export { handler as GET, handler as POST };
