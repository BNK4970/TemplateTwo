import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email, password, username, firstname, lastname } = await request.json();

    // Affiche les valeurs reçues (à enlever en production)
    console.log({ email, password, username, firstname, lastname }); 

    // Hachage du mot de passe
    const hashedPassword = await hash(password, 10);

    // Insertion de l'utilisateur avec le mot de passe haché
    const response = await sql`
      INSERT INTO users (email, password, username, firstname, lastname)
      VALUES (${email}, ${hashedPassword}, ${username}, ${firstname}, ${lastname})
    `;

    return NextResponse.json({
      message: 'User created successfully',
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: 'An error occurred',
    }, {
      status: 500
    });
  }
}
