import { create } from 'zustand';

import { pusherClient } from './pusher';

type PusherState = {
  socketId: string | null;
  initializePusher: (groupId: string) => () => void;
};

const usePusherStore = create<PusherState>((set) => ({
  socketId: null,
  initializePusher: (groupId: string) => {
    pusherClient.subscribe(groupId);

    pusherClient.connection.bind('connected', () => {
      set({
        socketId: pusherClient.connection.socket_id,
      });
    });
    return () => {
      pusherClient.connection.unbind('connected');
      pusherClient.connection.unbind('groups');
      pusherClient.connection.unbind('incoming-message');
      pusherClient.unsubscribe(groupId);
    };
  },
}));

export default usePusherStore;
