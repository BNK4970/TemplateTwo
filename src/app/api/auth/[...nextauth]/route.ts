import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

// Configurer NextAuth
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Email or password missing");
          return null;
        }

        // Requête SQL pour trouver l'utilisateur par email
        const response = await sql`
          SELECT * FROM users WHERE email = ${credentials.email}
        `;
        const user = response.rows[0];

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Comparer le mot de passe
        const passwordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!passwordCorrect) {
          console.log("Incorrect password");
          return null;
        }

        // Convertir en chaînes de caractères pour garantir la comparaison
        const emailConvert = String(user.email).trim();
        const adminEmailConvert = String(process.env.USER_ADMIN_EMAIL).trim();
        
        return {
          id: user.id,
          email: user.email,
          name: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          role: emailConvert === adminEmailConvert ? "admin" : "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Stocker le rôle de l'utilisateur dans le token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Assurez-vous que 'id' existe
        session.user.role = token.role as string; // Assurez-vous que 'role' existe
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
