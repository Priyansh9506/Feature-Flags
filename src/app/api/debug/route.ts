import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allFlags = await getAll();
    const envEdgeConfig = process.env.GLOBAL_CONFIG ? 'Set' : 'Missing';
    return NextResponse.json({ success: true, envEdgeConfig, flags: allFlags });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, envEdgeConfig: process.env.GLOBAL_CONFIG ? 'Set' : 'Missing' });
  }
}
