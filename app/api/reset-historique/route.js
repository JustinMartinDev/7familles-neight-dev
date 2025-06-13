import { NextResponse } from 'next/server';
import { neon } from '@netlify/neon';

export const dynamic = 'force-dynamic'; // Otherwise, Next.js will cache this handler's output

const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

export async function POST() {
  await sql`DELETE FROM tirages`;

  return NextResponse.json({ success: true });
}
