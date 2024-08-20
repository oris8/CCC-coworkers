import CommentIcon from '@/public/icons/comment.svg';
import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import KebabIcon from '@/public/icons/kebab_icon.svg';

function BoardComment() {
  return (
    <div className="flex h-[113px] flex-col justify-between rounded-lg bg-background-secondary p-4 md:h-[123px] md:px-6 md:py-5">
      <div className="flex justify-between">
        <p className="text-sm text-text-primary md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          dignissimos vero quas a sequi aperiam fugiat? Sunt mollitia numquam
        </p>
        <KebabIcon className="size-4 cursor-pointer" width={16} height={16} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <ProfileIcon className="size-8" />
          <p className="text-xs font-medium text-text-primary md:text-sm">
            이름
          </p>
          <div className="h-3 border-r border-slate-700" />
          <p className="text-xs font-medium text-slate-400 md:text-sm">
            nnnn. nn. nn
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs md:gap-4 md:text-sm">
          <div className="flex items-center gap-1">
            <CommentIcon className="size-4" />
            <p className="text-slate-400">n</p>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="size-4" />
            <p className="text-slate-400">n</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BoardComment;
