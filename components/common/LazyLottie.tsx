import { lazy, useEffect, useState } from 'react';

export const LazyLottieAnimation = lazy(() => import('./LottieAnimation'));

export function LazyLottie<T extends Record<string, unknown>>({
  animationData,
  ...props
}: any) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setData(animationData);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [animationData]);

  // TODO 스피너 등으로 교체
  if (loading) return <div className="center h-[300px] w-[300px]">...</div>;

  return <LazyLottieAnimation animationData={data} {...props} />;
}
