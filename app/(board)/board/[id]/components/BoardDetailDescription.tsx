import { dateFormatter } from '@/lib/utils';
import CommentIcon from '@/public/icons/comment.svg';
import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import { ArticleDetail } from '@ccc-types';

function BoardDetailDescription({ article }: { article: ArticleDetail }) {
  return (
    <div className="flex flex-col gap-6 text-text-secondary">
      <div>
        <div className="mb-4 mt-6 flex justify-between">
          <p className="font-medium md:text-lg">{article.title}</p>
          <KebabIcon className="size-6 cursor-pointer" width={24} height={24} />
        </div>
        <hr />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileIcon className="size-8" />
            <p className="text-xs font-medium text-text-primary md:text-sm">
              {article.writer.nickname}
            </p>
            <div className="h-3 border-r border-slate-700" />
            <p className="text-xs font-medium text-slate-400 md:text-sm">
              {dateFormatter.toConvertDate(article.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs md:gap-4 md:text-sm">
            <div className="flex items-center gap-1">
              <CommentIcon className="size-4" />
              <p className="text-slate-400">{article.commentCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <HeartIcon className="size-4" />
              <p className="text-slate-400">{article.likeCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm md:text-base">{article.content}</p>
      </div>
    </div>
  );
}
export default BoardDetailDescription;
