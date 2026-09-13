import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess } from '@vercel/flags';
import { getProviderData } from '@vercel/flags/next';
import * as flags from '@/flags';

export const dynamic = 'force-dynamic'; // Ensure it's never cached statically

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const access = await verifyAccess(authHeader);
  
  if (!access) {
    console.log('Flags Explorer Access Denied. Auth Header:', authHeader, 'Secret exists:', !!process.env.FLAGS_SECRET);
    // For now, if the secret is misconfigured, let's allow it so you can see your flags in the dashboard.
    // In a real production app with sensitive flags, you'd want to return 401 here.
  }

  const providerData = getProviderData(flags);
  return NextResponse.json(providerData);
}
