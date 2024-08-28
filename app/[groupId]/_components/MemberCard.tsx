'use client';

import { pusherClient } from '@/lib/pusher';
import { cn } from '@/lib/utils';
import DefaultProfile from '@/public/icons/default_profile.svg';
import StateBullet from '@/public/icons/state_bullet.svg';
import { Member, UserWithMemberships } from '@ccc-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import DeleteMemberModal from './DeleteMemberModal';

function MemberCard({
  member,
  groupId,
  className,
  initialOnlineState,
  user,
}: {
  member: Member;
  groupId: number;
  className?: string;
  initialOnlineState: boolean;
  user: UserWithMemberships;
}) {
  const isAdminOrOwner = user.memberships.some(
    (membership) =>
      +membership.groupId === +groupId &&
      (+membership.userId === +member.userId || membership.role === 'ADMIN')
  );

  const [userOnlineState, setUserOnlineState] = useState(initialOnlineState);
  useEffect(() => {
    const handleUserStatus = ({
      userId,
      isOnline,
    }: {
      userId: number;
      isOnline: boolean;
    }) => {
      if (userId === member.userId) {
        setUserOnlineState(isOnline);
      }
    };

    // 구독하고 있는 채널에 유저 접속 상태가 변경될 때마다 데이터 다시 가져옴
    pusherClient.bind('user-connected', handleUserStatus);
    pusherClient.bind('user-disconnected', handleUserStatus);
    return () => {
      // 언마운트시 해제
      pusherClient.unbind('user-connected', handleUserStatus);
      pusherClient.unbind('user-disconnected', handleUserStatus);
    };
  }, [member]);
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
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{member.userName}</p>
            <StateBullet
              width={15}
              height={15}
              fill={userOnlineState ? '#10B981' : '#7c838e'}
            />
          </div>
          <p className="truncate text-xs text-text-secondary">
            {member.userEmail}
          </p>
        </div>
      </div>
      {isAdminOrOwner && (
        <DeleteMemberModal
          groupId={groupId}
          memberId={member.userId}
          userData={user}
        />
      )}
    </div>
  );
}
export default MemberCard;
