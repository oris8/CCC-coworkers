import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import Image from 'next/image';

import BoardEditDropdown from './BoardEditDropdown';

function BoardCard() {
  return (
    <div className="flex h-[162px] flex-col justify-between rounded-xl bg-background-secondary px-4 py-6 font-medium text-text-secondary md:h-[176px] md:px-8">
      <div className="flex justify-between gap-x-10">
        <p className="md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi aperiam
          soluta, harum consequuntur quisquam quae null
        </p>
        <div className="flex gap-x-4">
          <div className="relative size-16 md:size-[72px]">
            <Image
              src="/images/test/test.webp"
              alt="test"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <BoardEditDropdown />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-3">
            <ProfileIcon className="size-8" />
            <p className="text-text-primary">이름</p>
          </div>
          <div className="h-[12px] w-[1px] bg-border" />
          <p className="text-slate-400">xxxx.yy.zz</p>
        </div>
        <div className="flex items-center gap-1">
          <HeartIcon className="size-4" />
          <p className="text-slate-400">n</p>
        </div>
      </div>
    </div>
  );
}
export default BoardCard;
