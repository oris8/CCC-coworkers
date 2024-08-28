/* eslint-disable import/prefer-default-export */
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  const { text, roomId, member, memberId, id, createdAt } = await req.json();

  pusherServer.trigger(roomId, 'incoming-message', {
    text,
    member,
    memberId,
    id,
    createdAt,
  });
  await db.message.create({
    data: { text, chatRoomId: roomId, memberId, member },
  });

  return new Response(JSON.stringify({ success: true }));
}
