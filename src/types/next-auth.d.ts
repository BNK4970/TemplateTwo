// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

// Définir un type étendu pour l'utilisateur
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      role?: string; // Ajoutez le rôle ici
    };
  }

  interface User {
    id?: string;
    email?: string;
    name?: string;
    role?: string; // Ajoutez le rôle ici
  }
}
