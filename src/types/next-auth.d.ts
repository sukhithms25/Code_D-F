import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role: string;
      firstName?: string;
      lastName?: string;
      branch?: string;
      department?: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: any;
  }
}
