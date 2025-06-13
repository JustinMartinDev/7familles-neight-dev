import { NextResponse } from 'next/server';
import { neon } from '@netlify/neon';

export const dynamic = 'force-dynamic'; // Otherwise, Next.js will cache this handler's output

const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

export async function GET() {
  const cartes = await sql`SELECT * FROM cartes`;

  return NextResponse.json({ cartes });
}
