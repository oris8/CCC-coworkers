import cn from '@/lib/utils';
import DefaultProfile from '@/public/icons/default_profile.svg';

function MemberCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-[68px] flex-col gap-y-[6px] rounded-2xl bg-background-secondary px-4 py-3 md:h-[73px] md:px-6 md:py-5',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <DefaultProfile className="size-6 md:size-8" />
        <div className="flex flex-col">
          <p className="text-sm font-medium">사람 이름</p>
          <p className="hidden text-xs text-text-secondary md:block">
            이메일@이메일.주소
          </p>
        </div>
      </div>
      <p className="text-xs text-text-secondary md:hidden">
        이메일@이메일.주소
      </p>
    </div>
  );
}
export default MemberCard;
