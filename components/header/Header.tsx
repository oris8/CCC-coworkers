import fetchAPI from '@/lib/api/fetchAPI';
import Logo from '@/public/icons/logo_coworkers.svg';
import Link from 'next/link';

import HamburgerSheet from './HamburgerSheet';
import HeaderDropdown from './HeaderDropdown';
import HeaderProfileDropdown from './HeaderProfileDropdown';

function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-[70] flex h-[60px] w-full items-center bg-background-secondary">
      <div className="flex h-full w-full items-center justify-between px-4 py-5 xl:mx-auto xl:w-[1200px] xl:p-0">
        {children}
      </div>
    </header>
  );
}

async function Header() {
  const { data } = await fetchAPI.User();
  
  if (data) {
    return (
      <HeaderContainer>
        <div className="flex items-center gap-4 md:hidden">
          <HamburgerSheet user={data} />
          <Link href="/">
            <Logo className="h-[20px] w-[102px] xl:h-[32px] xl:w-[158px]" />
          </Link>
        </div>
        <div className="hidden gap-8 md:flex md:items-center md:gap-10">
          <Link href="/">
            <Logo className="h-[20px] w-[102px] xl:h-[32px] xl:w-[158px]" />
          </Link>
          <HeaderDropdown user={data} />
          <Link href="/boards">자유게시판</Link>
        </div>
        <HeaderProfileDropdown user={data} />
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Logo className="h-[20px] w-[102px] xl:h-[32px] xl:w-[158px]" />
      </Link>
      <Link href="/login" className="text-base font-semibold">
        로그인
      </Link>
    </HeaderContainer>
  );
}
export default Header;
