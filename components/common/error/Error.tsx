import DogLottie from '@/public/animation/dog.json';

import { LazyLottie } from '../lottie/LazyLottie';
import ErrorFallBackButtons from './ErrorButtons';

interface ErrorProps {
  error?: any;
  title?: string;
  subTitle?: string;
  description: string;
  onClickRetry?: () => void;
  showRetryButton?: boolean;
}

const Error = ({
  error,
  title = '! ERROR',
  subTitle,
  description,
  onClickRetry,
  showRetryButton = false,
}: ErrorProps) => (
  <div className="center relative min-h-[calc(100vh-80px)] w-screen">
    <div className="mx-auto flex w-full max-w-[1000px] flex-col justify-evenly gap-8 p-12 md:my-auto md:min-h-[440px] md:flex-row-reverse md:py-24">
      <div className="md:flex md:min-h-[440px] md:grow md:flex-col md:px-12 md:py-24">
        <div>
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">{title}</h1>
          {subTitle && (
            <h2 className="mb-4 mt-8 break-keep text-text-default">
              {subTitle}
            </h2>
          )}
          <h3 className="mb-12 break-keep text-text-default">{description}</h3>
        </div>

        {/* 개발 모드에서는 에러 정보를 포함해서 렌더링 */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="my-8 h-auto min-h-[40px] w-full rounded-xl border-[1px] border-text-default p-8">
            <h2 className="mb-4 text-lg text-text-default">
              개발 모드에서만 보여지는 정보에요
            </h2>
            <p>{error && JSON.stringify(error, null, 2)}</p>
          </div>
        )}

        <div className="absolute bottom-16 w-[calc(100%-6rem)] md:relative md:bottom-0 md:mt-auto md:h-auto md:w-full">
          <ErrorFallBackButtons
            onClickRetry={onClickRetry}
            showRetryButton={showRetryButton}
          />
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

export default Error;
