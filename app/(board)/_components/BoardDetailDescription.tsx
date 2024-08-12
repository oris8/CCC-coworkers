import CommentIcon from '@/public/icons/comment.svg';
import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import KebabIcon from '@/public/icons/kebab.svg';

function BoardDetailDescription() {
  return (
    <div className="flex flex-col gap-6 text-text-secondary">
      <div>
        <div className="mb-4 mt-6 flex justify-between">
          <p className="font-medium md:text-lg">게시물 제목 영역입니다.</p>
          <KebabIcon className="size-6 cursor-pointer" />
        </div>
        <hr />
        <div className="mt-4 flex items-center justify-between">
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
      <div className="mt-6">
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis
          soluta aliquam quo magnam ipsam temporibus tempora cupiditate omnis?
          Fuga dolor iure repellat adipisci nihil veritatis excepturi doloribus
          perspiciatis officiis aspernatur!
        </p>
      </div>
    </div>
  );
}
export default BoardDetailDescription;
