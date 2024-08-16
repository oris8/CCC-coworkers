'use client';

import Error from '@/components/common/error/Error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
