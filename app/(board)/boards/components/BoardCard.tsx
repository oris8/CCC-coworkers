import { dateFormatter } from '@/lib/utils';
import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import { Article } from '@ccc-types';
import Image from 'next/image';
import Link from 'next/link';

async function BoardCard({ article }: { article: Article }) {
  return (
    <Link href={`/board/${article.id}?limit=10`}>
      <div className="flex h-[162px] flex-col justify-between rounded-xl bg-background-secondary px-4 py-6 font-medium text-text-secondary md:h-[176px] md:px-8">
        <div className="flex justify-between gap-x-10">
          <p className="truncate md:text-lg">{article.title}</p>
          <div className="flex gap-x-4">
            <div className="relative size-16 md:size-[72px]">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-3">
              <ProfileIcon className="size-8" />
              <p className="text-text-primary">{article.writer.nickname}</p>
            </div>
            <div className="h-[12px] w-[1px] bg-border" />
            <p className="text-slate-400">
              {dateFormatter.toConvertDate(article.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="size-4" />
            <p className="text-slate-400">{article.likeCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default BoardCard;
