import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 1 * 24 * 60 * 60,
  },
  theme: {
    colorScheme: "light",
    logo: "/logo6.png",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user || !user.password) return null;
          const isValidPassowrd = bcrypt.compareSync(
            credentials.password,
            user.password
          );
          if (!isValidPassowrd) {
            return null;
          }
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as unknown as User).role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
};
