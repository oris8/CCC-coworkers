'use client';

import ErrorFallBackButtons from '@/components/common/ErrorFallBackButtons';
import { LazyLottie } from '@/components/common/LazyLottie';

import DogLottie from '../public/animation/dog.json';

const title = 'PAGE NOT FOUND';
const desc = '요청한 데이터를 찾을 수 없습니다';

const Page = () => (
  <div className="center relative min-h-[calc(100vh-80px)] w-screen">
    <div className="mx-auto flex w-full max-w-[1000px] flex-col justify-evenly p-12 md:my-auto md:min-h-[440px] md:flex-row-reverse md:py-24">
      <div className="md:flex md:min-h-[440px] md:grow md:flex-col md:px-12 md:py-24">
        <div className="md:pb-16">
          <h1 className="mb-8 text-5xl font-bold md:text-7xl">! ERROR</h1>
          <h2 className="mb-4 break-keep text-text-default">{title}</h2>
          <h2 className="break-keep text-text-default">{desc}</h2>
        </div>

        <div className="absolute bottom-16 w-[calc(100%-6rem)] md:relative md:bottom-0 md:mt-auto md:h-auto md:w-full">
          <ErrorFallBackButtons />
        </div>
      </div>

      <div className="center relative left-0 mx-auto mb-16 w-full max-w-[440px] md:mb-0">
        <LazyLottie
          animationData={DogLottie}
          loop
          play
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '440px',
            maxHeight: '440px',
          }}
        />
      </div>
    </div>
  </div>
);

export default Page;
