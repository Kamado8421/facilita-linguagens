/* eslint-disable */

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    firstName: string | null;
    email: string | null;
    profileUrl: string | null;
    xp: number;
    createdAt: Date;
  }

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

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
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
