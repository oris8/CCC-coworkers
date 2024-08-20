'use client';

import selectedGroupIdAtom from '@/atoms/groupAtoms';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteGroup } from '@/lib/api/group';
import { UserWithMemberships } from '@ccc-types';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import GroupEditDropdown from './GroupEditDropdown';

function HeaderDropdown({ user }: { user: UserWithMemberships }) {
  const router = useRouter();
  const [selectedGroupId, setSelectedGroupId] = useAtom(selectedGroupIdAtom);

  const currentGroup =
    user?.memberships.find(
      (membership) => membership.group.id === Number(selectedGroupId)
    )?.group || user?.memberships[0].group;

  const handleGroupChange = (newGroupId: number) => {
    setSelectedGroupId(newGroupId);
  };

  const handleGroupDelete = async (groupId: number) => {
    await deleteGroup(groupId);
    if (groupId === selectedGroupId) {
      setSelectedGroupId(user?.memberships[0].group.id);
      router.push('/');
    }
    router.refresh();
  };

  return (
    <DropdownMenu>
      {/* TODO - 현재 접속해있는 그룹으로 */}
      {user?.memberships[0].group.name && (
        <DropdownMenuTrigger>{currentGroup?.name}</DropdownMenuTrigger>
      )}
      <DropdownMenuContent className="z-dropdown mt-5 flex w-[218px] flex-col gap-2 p-4">
        {user?.memberships.map(({ group }) => (
          <DropdownMenuItem key={group.id} className="flex justify-between">
            <div className="flex w-full items-center gap-2">
              {group.image && (
                <Image
                  src={group.image}
                  alt={group.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-md"
                />
              )}
              <DropdownMenuItem asChild>
                <Link
                  href={`/${group.id}`}
                  className="w-[110px] cursor-pointer"
                  onClick={() => handleGroupChange(group.id)}
                >
                  <p className="w-full truncate font-medium">{group.name}</p>
                </Link>
              </DropdownMenuItem>
            </div>
            <GroupEditDropdown
              groupId={group.id}
              onClick={() => handleGroupDelete(group.id)}
            />
          </DropdownMenuItem>
        ))}
        <Link href="/create-team">
          <Button className="border border-slate-50 bg-transparent font-medium hover:bg-customBackground-teritiary">
            + 팀 추가하기
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default HeaderDropdown;
