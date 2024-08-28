/* eslint-disable import/prefer-default-export */
import { pusherServer } from '@/lib/pusher';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const data = await req.text();

  const [socketId, channelName] = data
    .split('&')
    .map((str) => str.split('=')[1]);

  // 유저별 고유 식별 아이디 적용
  const id = uuidv4();

  const presenceData = {
    user_id: id,
    user_data: { user_id: id },
  };

  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    presenceData
  );

  return new Response(JSON.stringify(auth));
}
