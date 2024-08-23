'use client';

import Error from '@/components/common/error/Error';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <Error
          subTitle="Something went wrong!"
          description={`${error.message} ${error.digest}`}
          onClickRetry={() => reset()}
          showRetryButton
        />
      </body>
    </html>
  );
}
