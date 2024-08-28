/* eslint-disable import/prefer-default-export */
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  const { member, task, action, roomId, socketId } = await req.json();

  if (action === 'create') {
    await pusherServer.trigger(
      String(roomId),
      'group',
      `${member} 님이 ${task} 를 생성하였습니다.`,
      {
        socket_id: socketId,
      }
    );
  }

  if (action === 'edit') {
    await pusherServer.trigger(
      String(roomId),
      'group',
      `${member} 님이 ${task} 를 완료하였습니다.`,
      {
        socket_id: socketId,
      }
    );
  }

  if (action === 'delete') {
    await pusherServer.trigger(
      String(roomId),
      'group',
      `${member} 님이 ${task} 를 삭제하였습니다.`,
      {
        socket_id: socketId,
      }
    );
  }

  return new Response(JSON.stringify({ success: true }));
}
