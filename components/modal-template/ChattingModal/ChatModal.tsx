'use client';

import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ChatBtn from '@/public/icons/button/chat_btn.svg';
import CloseIcon from '@/public/icons/modal/close_icon.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { useState } from 'react';

import MessageField from './MessageField';
import Messages from './Messages';

interface ChatModalProps {
  groupId: number;
  userId: number;
  userName: string;
  serializedMessages: SerializedMessages[];
}
interface SerializedMessages {
  text: string;
  id: number;
  memberId: number;
  member: string;
  createdAt: Date;
}

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  hasCloseIcon?: boolean;
};

const mdAnimation =
  'md:bottom-auto md:right-[5%] md:top-1/2 md:-translate-y-1/2 md:rounded-xl md:data-[state=closed]:slide-out-to-right-1/2 md:data-[state=closed]:slide-out-to-top-[48%] md:data-[state=open]:slide-in-from-right-1/2 md:data-[state=open]:slide-in-from-top-[48%]';

const commonAnimation =
  ' duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom';

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hasCloseIcon, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `fixed bottom-0 z-modal flex w-full max-w-[500px] flex-col items-center justify-center gap-4 rounded-t-xl border bg-customBackground-secondary pb-[32px] pl-[16px] pt-[16px] shadow-lg max-md:left-0 max-md:right-0 max-md:mx-auto ${mdAnimation} ${commonAnimation}`,
        className
      )}
      {...props}
    >
      {hasCloseIcon && (
        <DialogPrimitive.Close className="ml-auto opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <DialogClose />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function ChatModal({
  groupId,
  userId,
  userName,
  serializedMessages,
}: ChatModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="fixed bottom-[5%] right-[5%] h-[50px] w-[50px] cursor-pointer rounded-full bg-brand-primary p-[10px]"
        asChild
      >
        <ChatBtn fill="#FFFFFF" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="flex w-full max-w-full flex-row justify-between pr-[16px]">
          <DialogTitle>채팅</DialogTitle>

          <DialogClose asChild>
            <CloseIcon className="cursor-pointer" />
          </DialogClose>
        </DialogHeader>
        <div className="flex w-full flex-col gap-6">
          <Messages
            initialMessages={serializedMessages}
            userId={userId}
            groupId={groupId}
          />
          <MessageField groupId={groupId} userId={userId} userName={userName} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChatModal;
