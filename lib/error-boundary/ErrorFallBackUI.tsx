'use client';

import FetchError from '@/lib/api/HttpClient/FetchError';

/* eslint-disable */

interface ErrorBoundaryState {
  hasError?: boolean;
  didCatch?: boolean;
  error?: Error | FetchError | any;
}

const ErrorFallbackUI = ({ hasError, didCatch, error }: ErrorBoundaryState) => {
  if (!error) return null;

  return (
    <div className="p-16">
      <h1 className="my-4">임시 에러 폴백 컴포넌트</h1>
      {JSON.stringify(error, null, 2)}
    </div>
  );
};

export default ErrorFallbackUI;
