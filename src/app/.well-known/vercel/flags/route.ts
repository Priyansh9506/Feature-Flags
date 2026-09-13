import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess, type ApiData } from '@vercel/flags';
import { getProviderData } from '@vercel/flags/next';
import * as flags from '@/flags';

export const dynamic = 'force-dynamic'; // Ensure it's never cached statically

export async function GET(request: NextRequest) {
  // 1. Verify that the incoming request is authorized by Vercel Toolbar
  const authHeader = request.headers.get('Authorization');
  const access = await verifyAccess(authHeader);
  
  if (!access) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Extract provider data automatically from your flags module
  const providerData = getProviderData(flags);

  return NextResponse.json<ApiData>(providerData);
}
