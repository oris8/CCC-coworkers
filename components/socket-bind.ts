'use client';

import { pusherClient } from '@/lib/pusher';
import { useEffect } from 'react';
import { toast } from 'sonner';

type SocketBindProps = {
  groupId: number;
};

const SocketBind = ({ groupId }: SocketBindProps) => {
  const pusherListener = () => {
    pusherClient.bind('group', (message: string) => {
      // TODO: UI 에서 Toast notification
      if (message.includes('삭제')) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  };

  useEffect(() => {
    pusherListener();
  }, [groupId]);

  return null;
};

export default SocketBind;
