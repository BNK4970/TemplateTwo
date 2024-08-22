import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(request: NextRequest) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM users'); // Remplacez "users" par le nom de votre table
    const users = result.rows;
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    return NextResponse.json({ error: 'Erreur de récupération des utilisateurs' }, { status: 500 });
  } finally {
    await client.end();
  }
}
