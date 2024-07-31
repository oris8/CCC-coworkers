import LandingBottomSection from '@/components/landing/LandingBottomSection';
import LandingCardSection from '@/components/landing/LandingCardSection';
import LandingTopSection from '@/components/landing/LandingTopSection';

export default function Home() {
  return (
    <>
      <LandingTopSection />
      <LandingCardSection />
      <LandingBottomSection />
    </>
  );
}
