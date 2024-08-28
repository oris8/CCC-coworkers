'use client';

import usePusherStore from '@/lib/store';
import { useEffect } from 'react';

function InitializePusher({ groupId }: { groupId: number }) {
  const { initializePusher } = usePusherStore();

  useEffect(() => {
    initializePusher(groupId.toString()); // groupId로 Pusher 초기화
  }, [groupId, initializePusher]);

  return null;
}

export default InitializePusher;
