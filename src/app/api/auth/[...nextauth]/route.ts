import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { store } from "@/redux/store";
import { setAccessToken } from "@/redux/slices/appSlice";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    newUser: "/signup",
    error: "/signin",
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
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        signIn: { type: "hidden", value: "boolean" },
      },
      async authorize(credentials) {
        const signIn = credentials?.signIn === "true";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${signIn ? "signin" : "signup"}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          }
        );
        const user = await res.json();
        if ((res.status === 200 || res.status === 201) && user) {
          store.dispatch(setAccessToken(user.access_token));
          return user;
        } else if (user?.msg) {
          return Promise.reject(new Error("error:" + user.msg));
        }
        console.log(res);
        return Promise.reject();
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 6, // 6 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
