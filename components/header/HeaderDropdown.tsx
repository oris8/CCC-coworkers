import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import { UserWithMemberships } from '@ccc-types';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

function HeaderDropdown({ user }: { user: UserWithMemberships }) {
  return (
    <DropdownMenu>
      {/* TODO - 현재 접속해있는 그룹으로 */}
      {user?.memberships[0].group.name && (
        <DropdownMenuTrigger>
          {user?.memberships[0].group.name}
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent className="z-dropdown mt-5 flex w-[218px] flex-col gap-2 p-4">
        {user?.memberships.map((membership) => (
          <DropdownMenuItem
            key={membership.group.id}
            className="flex justify-between"
          >
            <div className="flex w-full items-center gap-2">
              {membership.group.image && (
                <Image
                  src={membership.group.image}
                  alt={membership.group.name}
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              )}
              <DropdownMenuItem asChild>
                <Link
                  href={`/${membership.group.id}`}
                  className="w-[120px] cursor-pointer"
                >
                  <p className="w-full truncate font-medium">
                    {membership.group.name}
                  </p>
                </Link>
              </DropdownMenuItem>
            </div>
            <KebabIcon width={24} height={24} />
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
