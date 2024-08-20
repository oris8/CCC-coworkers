import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NoGroup() {
  return (
    <div className="m-auto mt-[180px] w-full max-w-[810px] items-center">
      <Image
        src="/images/nogroup.png"
        width={312}
        height={98}
        alt="소속된 그룹이 없는 경우 나오는 이미지"
        className="m-auto md:w-[520px] lg:w-[810px]"
      />
      <p className="mb-[80px] mt-[32px] text-center text-text-default md:mb-[80px] md:mt-[48px] lg:mb-[80px] lg:mt-[48px]">
        아직 소속된 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className="flex flex-col items-center">
        <Link href="/create-team">
          <Button type="button" className="w-[186px]">
            팀 생성하기
          </Button>
        </Link>
        <Link href="/invitation-team">
          <Button
            type="button"
            variant="outlined"
            className="mt-[6px] w-[186px] bg-transparent lg:mt-[16px]"
          >
            팀 참여하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
