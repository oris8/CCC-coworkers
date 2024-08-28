'use client';

import usePusherStore from '@/lib/store';
import { useEffect } from 'react';

// components/InitializePusher.tsx

function InitializePusher({ groupId }: { groupId: number }) {
  const { initializePusher } = usePusherStore();

  useEffect(() => {
    initializePusher(groupId.toString()); // groupId로 Pusher 초기화
  }, [groupId, initializePusher]);

  return null; // UI를 렌더링하지 않음
}

export default InitializePusher;
