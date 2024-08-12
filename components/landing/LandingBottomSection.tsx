import Image from 'next/image';

export default function LandingBottomSection() {
  return (
    <section className="relative h-screen">
      {/* NOTE - 하단 랜딩 이미지 */}
      <div className="z-landing-image absolute size-full">
        <Image
          src="/images/landing_bottom.png"
          alt="bottom landing image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center pt-[123px] text-center md:pt-[176px] xl:pt-[230px]">
        <h1 className="mb-4 text-2xl font-semibold md:mb-6 md:text-[40px]">
          지금 바로 시작해보세요
        </h1>
        <p className="text-base font-medium md:text-2xl">
          팀원 모두와 같은 방향,
          <br className="md:hidden" /> 같은 속도로 나아가는 가장 쉬운 방법
        </p>
      </div>
    </section>
  );
}
