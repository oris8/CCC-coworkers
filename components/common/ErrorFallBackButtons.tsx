'use client';

import { Button } from '@/components/ui/button';
import RetryIcon from '@/public/icons/list/daily_task_icon.svg';
import { useEffect, useState } from 'react';

const goToLandingPage = () => {
  if (typeof window === 'undefined') return;
  window.location.href = '/';
  // REVIEW  router.push("/") 로 작업하면 이동 후 새로고침이 안되어서 계속 에러 페이지가 나는 문제가 있습니다.
  //  router.push("/") 후 router.refresh() 를 해도 동일한 문제가 있어요
  //  window 객체 사용없이 이 문제 해결법 하시는 분 리뷰 부탁드립니다
};

const ErrorFallBackButtons = ({
  onClickRetry,
}: {
  onClickRetry?: () => void;
}) => {
  const [isServerOffline, setIsServerOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsServerOffline(true);
    const handleOnline = () => setIsServerOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div className="flex gap-4">
      <Button onClick={goToLandingPage}>홈페이지로 돌아가기</Button>
      {/* 네트워크 관련 오류가 났을 때는 다시 시도하기 버튼을 렌더링 */}
      {isServerOffline && (
        <Button
          onClick={onClickRetry}
          variant="outlined"
          className="w-[max-content] p-[14px]"
        >
          <RetryIcon />
        </Button>
      )}
    </div>
  );
};

export default ErrorFallBackButtons;
