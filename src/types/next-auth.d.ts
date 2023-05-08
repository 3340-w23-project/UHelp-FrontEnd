import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      display_name: string;
      exp: number;
      iat: number;
      jti: string;
      username: string;
    };
  }
}
