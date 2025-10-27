import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { User } from "../contexts/UserContext";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username as string },
                });

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password as string, user.password);
                if (!isValid) return null;

                return { ...user, password: undefined, emailVerified: null }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // opcional: página customizada
    },
    callbacks: {
        async jwt({ token, user }) {
            // user só existe no primeiro login
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // injeta o user completo na sessão
            session.user = token.user as User;
            return session;
        },
    },
});
