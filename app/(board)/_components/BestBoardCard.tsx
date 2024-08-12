import cn from '@/lib/utils';
import CommentIcon from '@/public/icons/comment.svg';
import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import MedalIcon from '@/public/icons/medal.svg';
import Image from 'next/image';

function BestBoardCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative h-[178px] w-full rounded-xl bg-background-secondary px-4 pt-10 md:h-[220px] md:px-6 md:pt-12',
        className
      )}
    >
      <div className="absolute left-[14px] top-[10px] flex items-center gap-1 md:left-[18px] md:top-[8px]">
        <MedalIcon />
        <p>Best</p>
      </div>
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-text-secondary md:text-lg">
            자유게시판에 질문을 올릴 수 있어요
          </p>
          <p className="text-xs font-medium text-slate-400 md:text-sm">
            xxxx. yy. zz
          </p>
        </div>
        <div className="relative size-16 md:size-[72px]">
          <Image
            src="/images/test/test.webp"
            alt="test"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      {/* NOTE - absolute이므로 w는 width - 패딩 * 2 */}
      <div className="absolute bottom-4 flex w-[calc(100%-32px)] items-center justify-between md:w-[calc(100%-48px)]">
        <div className="flex items-center gap-3">
          <ProfileIcon className="size-8" />
          <p>이름</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <div className="flex items-center gap-1">
            <CommentIcon className="size-4" />
            <p>n</p>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="size-4" />
            <p>n</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BestBoardCard;
