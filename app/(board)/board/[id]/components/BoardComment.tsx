import { dateFormatter } from '@/lib/utils';
import ProfileIcon from '@/public/icons/default_profile.svg';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import { ArticleComment } from '@ccc-types';

function BoardComment({ comment }: { comment: ArticleComment }) {
  return (
    <div className="flex h-[113px] flex-col justify-between rounded-lg bg-background-secondary p-4 md:h-[123px] md:px-6 md:py-5">
      <div className="flex justify-between">
        <p className="text-sm text-text-primary md:text-base">
          {comment.content}
        </p>
        <KebabIcon className="size-4 cursor-pointer" width={16} height={16} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <ProfileIcon className="size-8" />
          <p className="text-xs font-medium text-text-primary md:text-sm">
            {comment.writer.nickname}
          </p>
          <div className="h-3 border-r border-slate-700" />
          <p className="text-xs font-medium text-slate-400 md:text-sm">
            {dateFormatter.toConvertDate(comment.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
export default BoardComment;
