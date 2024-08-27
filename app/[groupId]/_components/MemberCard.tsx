import fetchAPI from '@/lib/api/fetchAPI';
import { cn } from '@/lib/utils';
import DefaultProfile from '@/public/icons/default_profile.svg';
import { Member } from '@ccc-types';
import Image from 'next/image';

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
      <div className="flex items-center gap-4">
        {member.userImage ? (
          <div className="relative size-6 rounded-full md:size-8">
            <Image
              src={member.userImage}
              alt="유저 프로필 이미지"
              fill
              className="rounded-full"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <DefaultProfile className="size-6 md:size-8" />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-medium">{member.userName}</p>
          <p className="hidden truncate text-xs text-text-secondary md:block">
            {member.userEmail}
          </p>
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
