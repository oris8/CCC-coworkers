'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';

function ImageModal({
  image,
  children,
}: {
  image: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="m-0 h-[500px] max-w-[600px] p-0">
        <div className="relative m-0 h-full w-full">
          <Image
            src={image}
            alt="게시글 확대 이미지"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;
