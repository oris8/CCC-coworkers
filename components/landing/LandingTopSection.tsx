import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LandingTopSection() {
  return (
    <section className="flex h-[calc(100vh-60px)] flex-col items-center">
      {/* NOTE - 상단 랜딩 이미지 */}
      <div className="absolute -z-50 size-full">
        <Image
          src="/images/landing_top.png"
          alt="top landing image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="mt-[55px] flex w-full flex-col items-center justify-center font-semibold md:mt-[100px]">
        <h1 className="mb-1 text-2xl md:mb-2 md:text-[40px] xl:mb-5 xl:text-5xl">
          함께 만들어가는 투두 리스트 🛠️
        </h1>
        <h1 className="inline-block bg-gradient-to-r from-[#10B981] to-[#CEF57E] bg-clip-text text-[32px] text-transparent md:text-5xl xl:text-[64px]">
          Coworkers
        </h1>
      </div>
      <div className="absolute bottom-12 w-full px-4 md:flex md:justify-center">
        <Button
          variant="floating"
          className="w-full bg-gradient-to-r from-[#10B981] to-[#A3E635] md:bottom-[120px] md:w-[373px]"
        >
          지금 시작하기
        </Button>
      </div>
    </section>
  );
}
