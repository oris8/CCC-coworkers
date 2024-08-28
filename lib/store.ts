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
      console.log('Pusher connected');

      set({
        socketId: pusherClient.connection.socket_id,
      });
    });
    return () => {
      pusherClient.unbind('groups');
      pusherClient.unbind('incoming-message');
      pusherClient.unsubscribe(groupId);
    };
  },
}));

export default usePusherStore;
