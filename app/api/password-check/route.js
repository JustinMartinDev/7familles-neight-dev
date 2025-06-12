import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Otherwise, Next.js will cache this handler's output

export async function POST(request) {
    try {
        const { password } = await request.json();

        // Vérification basique du password
        if (!password) {
            return NextResponse.json({ error: 'Password is required' }, { status: 400 });
        }

        if (password === 'ash2025') {
            return NextResponse.json({ mode: 'admin' }, { status: 200 });
        } else if (password === 'booster2025') {
            return NextResponse.json({ mode: 'user' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
