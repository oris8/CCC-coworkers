import { db } from '@/lib/db';

import ChatModal from './ChatModal';

interface ChatWrapProps {
  groupId: number;
  userId: number;
  userName: string;
}

async function ChatWrap({ groupId, userId, userName }: ChatWrapProps) {
  const existingMessages = await db.message.findMany({
    where: {
      chatRoomId: String(groupId),
    },
  });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
    memberId: message.memberId,
    member: message.member,
    createdAt: message.createdAt,
  }));

  return (
    <ChatModal
      groupId={groupId}
      userId={userId}
      userName={userName}
      serializedMessages={serializedMessages}
    />
  );
}

export default ChatWrap;
