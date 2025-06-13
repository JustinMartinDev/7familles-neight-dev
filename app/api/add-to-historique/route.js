import { NextResponse } from 'next/server';
import { neon } from '@netlify/neon';

export const dynamic = 'force-dynamic'; // Otherwise, Next.js will cache this handler's output

const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

export async function POST(request) {
  const { carte_id, date } = await request.json();

  await sql`INSERT INTO tirages (carte_id, date) VALUES (${carte_id}, ${date})`;

  return NextResponse.json({ success: true });
}
