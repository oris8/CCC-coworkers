import validateTokenAndSetAuthHeader from '@/lib/middlewares/auth.middleware';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const setAuthHeaderResponse = await validateTokenAndSetAuthHeader(request);
  if (setAuthHeaderResponse) return setAuthHeaderResponse;
}
