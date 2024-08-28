'use client';

import emitMessage from '@/app/api/pusher/message/emit';
import { Button } from '@/components/ui/button';
import usePusherStore from '@/lib/store';
import { ChangeEvent, FC, useState } from 'react';

interface MessageFieldProps {
  groupId: number;
  userName: string;
  userId: number;
}

const MessageField: FC<MessageFieldProps> = ({ groupId, userName, userId }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const { socketId } = usePusherStore();

  const sendMessage = async (text: string) => {
    await emitMessage({
      member: userName,
      memberId: userId,
      text,
      roomId: String(groupId),
      socketId: socketId as string,
    });
    setInput('');
  };

  return (
    <div className="flex gap-2 pr-[16px]">
      <textarea
        className="text max-h-full min-h-[120px] w-full resize-none rounded-md border border-text-default bg-transparent p-[10px] pt-3 outline-none"
        onChange={handleInputChange}
        value={input}
      />
      <Button
        type="submit"
        onClick={() => sendMessage(input || '')}
        className="w-fit px-[10px] py-[5px]"
      >
        send
      </Button>
    </div>
  );
};

export default MessageField;
