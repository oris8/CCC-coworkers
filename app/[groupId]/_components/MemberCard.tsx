import fetchAPI from '@/lib/api/fetchAPI';
import { cn } from '@/lib/utils';
import DefaultProfile from '@/public/icons/default_profile.svg';
import { Member } from '@ccc-types';

import DeleteMemberModal from './DeleteMemberModal';

async function MemberCard({
  member,
  groupId,
  className,
}: {
  member: Member;
  groupId: number;
  className?: string;
}) {
  const { data } = await fetchAPI.User();
  const isAdminOrOwner = data?.memberships.some(
    (membership) =>
      +membership.groupId === +groupId &&
      (+membership.userId === +member.userId || membership.role === 'ADMIN')
  );

  return (
    <div
      className={cn(
        'flex h-[68px] items-center justify-between rounded-2xl bg-background-secondary px-4 py-3 md:h-[73px] md:px-6 md:py-5',
        className
      )}
    >
      <div className="flex flex-col gap-y-[6px]">
        <div className="flex items-center gap-2">
          <DefaultProfile className="size-6 md:size-8" />
          <div className="flex flex-col">
            <p className="text-sm font-medium">{member.userName}</p>
            <p className="hidden truncate text-xs text-text-secondary md:block">
              {member.userEmail}
            </p>
          </div>
        </div>
        <p className="truncate text-xs text-text-secondary md:hidden">
          {member.userEmail}
        </p>
      </div>
      {isAdminOrOwner && (
        <DeleteMemberModal
          groupId={groupId}
          memberId={member.userId}
          userData={data!}
        />
      )}
    </div>
  );
}
export default MemberCard;
