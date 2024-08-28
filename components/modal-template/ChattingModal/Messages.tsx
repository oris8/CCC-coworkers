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
}

function Messages({ initialMessages, userId }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    pusherClient.bind('incoming-message', (newMessage: Message) => {
      // 서버에서 전달된 createdAt이 undefined일 경우 클라이언트에서 현재 시간을 기본값으로 설정
      const formattedMessage = {
        ...newMessage,
        createdAt: newMessage.createdAt
          ? new Date(newMessage.createdAt)
          : new Date(),
      };

      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === formattedMessage.id)) {
          return [...prevMessages, formattedMessage];
        }
        return prevMessages;
      });
    });

    return () => {
      pusherClient.unbind('incoming-message');
    };
  }, []);

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
