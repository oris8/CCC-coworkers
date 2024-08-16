'use client';

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
        <h2>Something went wrong!</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
        {/* 개발 모드에서는 에러 정보를 포함해서 렌더링 */}
        {process.env.NODE_ENV !== 'production' && (
          <div>
            <h2 className="mb-4 text-xl text-text-default">
              개발 모드에서만 보여지는 정보에요
            </h2>
            <p>{JSON.stringify(error, null, 2)}</p>
          </div>
        )}
      </body>
    </html>
  );
}
