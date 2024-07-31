import {
  LandingCard,
  LandingContainer,
} from '@/components/landing/LandingCard';
import { Label } from '@/components/ui/label';
import FirstLandingCardIcon from '@/public/icons/landing_card_first_icon.svg';
import SecondLandingCardIcon from '@/public/icons/landing_card_second_icon.svg';
import ThirdLandingCardIcon from '@/public/icons/landing_card_third_icon.svg';
import Image from 'next/image';

export default function LandingCardSection() {
  return (
    <section className="space-y-6 px-4 md:px-6 xl:mx-auto xl:w-[1000px] xl:space-y-20 xl:px-0">
      <LandingCard>
        <LandingContainer>
          {/* NOTE - 부모의 패딩 값만큼 right를 이동시켜야 합니다 */}
          <div className="absolute top-12 flex flex-col gap-y-4 md:right-40 md:top-1/2 md:-translate-y-1/2 md:justify-center xl:right-[174px]">
            <div className="flex size-12 items-center justify-center rounded-xl border bg-background-secondary">
              <FirstLandingCardIcon />
            </div>
            <Label className="text-lg font-medium">
              그룹으로
              <br /> 할 일을 관리해요
            </Label>
          </div>
          <div className="absolute bottom-0 h-[273px] w-[235px] xl:h-[338px] xl:w-[291px]">
            <Image
              src="/images/landing_card_first.png"
              alt="first landing card"
              fill
              sizes="(min-width: 768px) 291px, 235px"
              className="object-contain"
            />
          </div>
        </LandingContainer>
      </LandingCard>
      <LandingCard className="bg-background-secondary">
        <LandingContainer>
          <div className="absolute bottom-12 flex flex-col gap-y-4 md:top-1/2 md:-translate-y-1/2 md:justify-center">
            <div className="flex size-12 items-center justify-center rounded-xl border bg-background-secondary">
              <SecondLandingCardIcon />
            </div>
            <Label className="text-lg font-medium">
              간단하게 멤버들을
              <br /> 초대해요
            </Label>
          </div>
          <div className="absolute top-0 h-[273px] w-[235px] md:right-40 xl:right-[174px] xl:h-[338px] xl:w-[291px]">
            <Image
              src="/images/landing_card_second.png"
              alt="second landing card"
              fill
              sizes="(min-width: 768px) 291px, 235px"
              className="object-contain"
            />
          </div>
        </LandingContainer>
      </LandingCard>
      {/* TODO - 화이트 모드 색상 고려할 것 */}
      <LandingCard className="bg-[#020617]">
        <LandingContainer>
          {/* NOTE - 부모의 패딩 값만큼 right를 이동시켜야 합니다 */}
          <div className="absolute bottom-12 flex flex-col gap-y-4 md:right-40 md:top-1/2 md:-translate-y-1/2 md:justify-center xl:right-[174px]">
            <div className="flex size-12 items-center justify-center rounded-xl border bg-background-secondary">
              <ThirdLandingCardIcon />
            </div>
            <Label className="text-lg font-medium">
              할 일도 간편하게
              <br /> 체크해요
            </Label>
          </div>
          <div className="absolute top-0 h-[273px] w-[235px] xl:h-[338px] xl:w-[291px]">
            <Image
              src="/images/landing_card_third.png"
              alt="third landing card"
              fill
              sizes="(min-width: 768px) 291px, 235px"
              className="object-contain"
            />
          </div>
        </LandingContainer>
      </LandingCard>
    </section>
  );
}
