import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
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
      async authorize(credentials, req) {
        const response = await sql`
          SELECT * FROM users WHERE email=${credentials?.email}`;
        const user = response.rows[0];

        if (!user) {
          console.log("Utilisateur non trouvé");
          return null;
        }

        console.log("Mot de passe en clair soumis :", credentials?.password);
        console.log("Mot de passe hashé depuis la DB :", user.password);

        // Comparaison du mot de passe
        const passwordCorrect = await compare(credentials?.password || "", user.password);

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        console.log("Mot de passe incorrect");
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
