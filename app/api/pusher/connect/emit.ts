type Params = {
  action: 'userConnected' | 'userDisconnected';
  userId: number;
  roomId: string;
  socketId: string;
  isOnline: boolean;
};

export default async function emitConnect(data: Params): Promise<void> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({ ...data });

  await fetch('/api/pusher/connect', obj);
}
