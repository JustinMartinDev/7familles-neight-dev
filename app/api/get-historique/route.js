import { NextResponse } from 'next/server';
import { neon } from '@netlify/neon';

export const dynamic = 'force-dynamic'; // Otherwise, Next.js will cache this handler's output

const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

export async function GET() {
  const tirages = await sql`SELECT * FROM tirages`;

  return NextResponse.json({ historique: tirages });
}
