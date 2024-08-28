type Params = {
  member: string;
  text: string;
  roomId: string;
  memberId: number;
  socketId: string;
};

export default async function emitMessage(data: Params): Promise<void> {
  const obj: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  obj.body = JSON.stringify({ ...data });

  await fetch('/api/pusher/message', obj);
}
