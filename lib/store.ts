import { create } from 'zustand';

import { pusherClient } from './pusher';

type PusherState = {
  socketId: string | null;
  isConnected: boolean;
  initializePusher: (groupId: string) => () => void;
};

// Pusher 초기화 여부를 추적하는 전역 변수
let isInitialized = false;

const usePusherStore = create<PusherState>((set, get) => ({
  socketId: null,
  isConnected: false,
  initializePusher: (groupId: string) => {
    // 이미 초기화되었다면 아무 것도 하지 않음
    if (isInitialized) {
      return () => {};
    }

    isInitialized = true;

    // socketId를 업데이트하는 함수
    const updateSocketId = () => {
      const newSocketId = pusherClient.connection.socket_id;
      if (newSocketId !== get().socketId) {
        set({ socketId: newSocketId });
      }
    };

    // 연결 상태 변경을 처리하는 함수
    const handleConnectionChange = (state: boolean) => {
      set({ isConnected: state });
      if (state) {
        updateSocketId();
      } else {
        set({ socketId: null });
      }
    };

    // Pusher 연결 이벤트에 대한 핸들러 등록
    pusherClient.connection.bind('connected', () =>
      handleConnectionChange(true)
    );
    pusherClient.connection.bind('disconnected', () =>
      handleConnectionChange(false)
    );

    // 이미 연결된 상태라면 상태 업데이트
    if (pusherClient.connection.state === 'connected') {
      handleConnectionChange(true);
    }

    // 지정된 그룹 ID로 채널 구독
    const channel = pusherClient.subscribe(groupId);
    channel.bind('pusher:subscription_succeeded', updateSocketId);

    // 정리 함수 반환
    return () => {
      if (isInitialized) {
        pusherClient.unsubscribe(groupId);
        pusherClient.connection.unbind_all();
        isInitialized = false;
      }
    };
  },
}));

export default usePusherStore;
