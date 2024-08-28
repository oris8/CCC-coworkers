/* eslint-disable import/prefer-default-export */
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';

export const POST = async (req: Request) => {
  const { userId, action, roomId, isOnline } = await req.json();
  if (action === 'userConnected') {
    // 유저를 온라인 상태로 설정
    await db.member.upsert({
      where: { id: userId },
      update: { isOnline: true, groupId: roomId },
      create: {
        id: userId,
        groupId: roomId,
        isOnline,
      },
    });

    await pusherServer.trigger(roomId, 'user-connected', { userId, isOnline });
  } else if (action === 'userDisconnected') {
    // 유저를 오프라인 상태로 설정
    await db.member.update({
      where: { id: userId },
      data: { isOnline },
    });
    await pusherServer.trigger(roomId, 'user-disconnected', {
      userId,
      isOnline,
    });
  }

  return new Response(JSON.stringify({ success: true }));
};
