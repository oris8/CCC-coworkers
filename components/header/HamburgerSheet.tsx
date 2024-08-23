import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import HamburgerIcon from '@/public/icons/hamburger.svg';
import { UserWithMemberships } from '@ccc-types';
import Link from 'next/link';

function HamburgerSheet({ user }: { user: UserWithMemberships }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerIcon className="size-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        className="z-max w-[200px] bg-background-secondary"
        side="left"
        type="headerSheet"
      >
        <div className="mt-6 flex flex-col gap-6 truncate">
          {user?.memberships.map((membership) => (
            <SheetClose key={membership.group.id} asChild>
              <Link href={`/${membership.group.id}`}>
                {membership.group.name}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href="/boards?page=1">자유게시판</Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default HamburgerSheet;
