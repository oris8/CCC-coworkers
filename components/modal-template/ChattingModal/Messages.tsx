'use client';

import { pusherClient } from '@/lib/pusher';
import { dateFormatter } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  id: number;
  memberId: number;
  member: string;
  createdAt: Date;
}

interface MessagesProps {
  initialMessages: Message[];
  userId: number;
  groupId: number;
}

function Messages({ initialMessages, userId, groupId }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages); // 초기 상태를 initialMessages로 설정

  useEffect(() => {
    // 이벤트 연결
    pusherClient.bind('incoming-message', (newMessage: Message) => {
      const formattedMessage = {
        ...newMessage,
        createdAt: newMessage.createdAt
          ? new Date(newMessage.createdAt)
          : new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, formattedMessage]);
    });

    // 클린업
    return () => {
      pusherClient.unbind('incoming-message');
    };
  }, [groupId]);

  // 채팅창을 열었을때 스크롤바가 아래로 향하게
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const chatIncoming = 'bg-customBackground-teritiary';
  const chatOutgoing = 'bg-brand-primary';
  return (
    <div className="h-[500px] overflow-y-auto pr-[15px]" ref={chatContainerRef}>
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-[20px] flex flex-col ${message.memberId === userId ? 'items-end' : ''}`}
          >
            <p>{message.member}</p>
            <p
              className={`w-fit rounded-lg px-[20px] py-[10px] ${
                message.memberId === userId ? chatOutgoing : chatIncoming
              } `}
            >
              {message.text}
            </p>
            <p className="mt-[3px] text-xs text-text-default">
              {dateFormatter.toTimeDifference(message.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
