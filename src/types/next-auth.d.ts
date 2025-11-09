import NextAuth from "next-auth";

// @typescript-eslint/no-unused-vars
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      firstName: string | null;
      email: string | null;
      profileUrl: string | null;
      xp: number;
      createdAt: Date;
    };
  }
}
