import {
  processTokenFromQuery,
  setAuthHeader,
  withAuth,
} from '@/lib/middlewares';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const withAuthResponse = await withAuth(request);
  if (withAuthResponse) return withAuthResponse;

  const setAuthHeaderResponse = await setAuthHeader(request);
  if (setAuthHeaderResponse) return setAuthHeaderResponse;

  const resetPasswordResponse = await processTokenFromQuery(request);
  if (resetPasswordResponse) return resetPasswordResponse;
}
