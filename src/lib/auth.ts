// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { prisma } from "./prisma";
// import bcrypt from "bcrypt";
// import { JWT } from "next-auth/jwt";

// type UserType = {
//     id: string;
//     username: string;
//     firstName: string | null;
//     email: string | null;
//     profileUrl: string | null;
//     xp: number;
//     createdAt: Date;
// };

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Credentials({
//             id: "credentials",
//             name: "Username",
//             credentials: {
//                 username: { label: "Username", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             authorize: async (credentials: any) => {
//                 if (!credentials?.username || !credentials?.password) {
//                     console.log("authorize: username ou senha faltando");
//                     return null;
//                 }

//                 // Busca usuário pelo username
//                 const user = await prisma.user.findFirst({
//                     where: { username: credentials.username },
//                 });

//                 if (!user) {
//                     console.log("authorize: usuário não encontrado", credentials.username);
//                     return null
//                 }

//                 // Verifica senha
//                 const passwordValid = await bcrypt.compare(
//                     credentials.password,
//                     user.password
//                 );

//                 if (!passwordValid) {
//                     console.log("authorize: senha incorreta para", credentials.username);
//                     return null;
//                 }

//                 // Retorna dados seguros
//                 return {
//                     id: user.id,
//                     username: user.username,
//                     firstName: user.firstName ?? null,
//                     email: user.email ?? null,
//                     profileUrl: user.profileUrl ?? null,
//                     xp: user.xp ?? 0,
//                     createdAt: user.createdAt,
//                 } as UserType;
//             },
//         }),
//     ],

//     session: {
//         strategy: "jwt",
//     },


//     callbacks: {
//         async jwt({ token, user }: any) {
//             if (user) token.user = user;
//             return token;
//         },

//         async session({ session, token }: any) {
//             if (token?.user) {
//                 session.user = {
//                     id: token.user.id,
//                     username: token.user.username,
//                     firstName: token.user.firstName ?? null,
//                     email: token.user.email ?? null,
//                     profileUrl: token.user.profileUrl ?? null,
//                     xp: token.user.xp ?? 0,
//                     createdAt: token.user.createdAt,
//                 };
//             }
//             return session;
//         },
//     },


//     pages: {
//         signIn: "/login",
//     },
// });
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

// type UserType = {
//     id: string;
//     username: string;
//     firstName: string | null;
//     email: string | null;
//     profileUrl: string | null;
//     xp: number;
//     createdAt: Date;
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Username",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const username = credentials?.username as string | undefined;
                const password = credentials?.password as string | undefined;

                if (!username || !password) return null;

                const user = await prisma.user.findFirst({
                    where: { username }
                });

                if (!user) return null;

                const valid = await bcrypt.compare(password, user.password);
                if (!valid) return null;

                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    email: user.email,
                    profileUrl: user.profileUrl,
                    xp: user.xp,
                    createdAt: user.createdAt,
                };
            }

        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    email: user.email,
                    profileUrl: user.profileUrl,
                    xp: user.xp,
                    createdAt: user.createdAt,
                };
            }

            return token;
        },


        async session({ session, token }: { session: Session; token: JWT }) {
            if (token.user) {
                session.user = {
                    id: token.user.id,
                    username: token.user.username,
                    firstName: token.user.firstName,
                    email: token.user.email,
                    profileUrl: token.user.profileUrl,
                    xp: token.user.xp,
                    createdAt: token.user.createdAt,
                };
            }

            return session;
        }

    },

    pages: {
        signIn: "/login",
    },
});
