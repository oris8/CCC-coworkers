'use client';

import lottieLoading from '@/public/animation/lottie_loading.json';
import Lottie from 'react-lottie-player';

export default function Loading() {
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <div className="flex h-[calc(100vh-60px)] flex-col items-center justify-center">
      <Lottie
        loop
        animationData={lottieLoading}
        play
        style={{ width: 500, height: 380 }}
      />

      <p className="mb-[30px] text-center text-[20px] font-bold tracking-[.25em] text-brand-primary">
        Loading...
      </p>
    </div>
  );
}
