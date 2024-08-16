'use client';

import FetchError from '@/lib/api/HttpClient/FetchError';

import DogLottie from '../../public/animation/dog.json';
import ErrorFallBackButtons from './ErrorFallBackButtons';
import { LazyLottie } from './LazyLottie';

/* eslint-disable */

interface ErrorBoundaryState {
  hasError?: boolean;
  didCatch?: boolean;
  error?: Error | FetchError | any;
  onClickRetry?: () => void;
}

const ERROR_MESSAGE: { [key: string]: string } = {
  400: '잘못된 형식의 요청입니다. 입력값을 확인해주세요.',
  401: '인증되지 않은 사용자입니다. 로그인 후 다시 시도해주세요.',
  403: '권한이 없습니다. 접근이 거부되었습니다.',
  404: '요청한 데이터를 찾을 수 없습니다. 다시 시도해주세요.',
  409: '이미 존재하는 데이터가 있습니다. 다른 값을 사용해주세요.',
  500: '서버에서 응답을 받아오지 못했습니다. 잠시 후 다시 시도해주세요.',
  network: '네트워크 오류가 발생했습니다. 다시 시도해주세요',
  default:
    '예상치 못한 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의하세요.',
};

const getErrorMessage = (error: any) => {
  // 서버에서 전달해주는 bodyMessage는 사용 안함
  // bodyMessage는 되도록 각 페이지 단에서 처리
  // (ex. "unauthorized", "이미 사용중인 닉네임입니다" 등의 메세지는 에러폴백에서 보여줘야하는 정보가 아니라고 판단했습니다)
  if (
    error.message === 'ERR_NETWORK' ||
    error?.status === 598 ||
    error?.status === 599
  )
    return ERROR_MESSAGE.network;
  if (error.info) return error.info;
  if (error.status) return ERROR_MESSAGE[error.status] ?? ERROR_MESSAGE.default;
  return ERROR_MESSAGE.default;
};

const ErrorFallbackUI = ({ error, onClickRetry }: ErrorBoundaryState) => {
  if (!error) return;

  return (
    <div className="center relative min-h-[calc(100vh-80px)] w-screen">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col justify-evenly gap-8 p-12 md:my-auto md:min-h-[440px] md:flex-row-reverse md:py-24">
        <div className="md:flex md:min-h-[440px] md:grow md:flex-col md:px-12 md:py-24">
          <div>
            <h1 className="mb-4 text-5xl font-bold md:text-7xl">! ERROR</h1>
            <h2 className="break-keep text-text-default">
              {getErrorMessage(error)}
            </h2>
          </div>

          {/* 개발 모드에서는 에러 정보를 포함해서 렌더링 */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="my-8 h-auto min-h-[40px] w-full rounded-xl border-[1px] border-text-default p-8">
              <h2 className="mb-4 text-xl text-text-default">
                개발 모드에서만 보여지는 정보에요
              </h2>
              <p>{JSON.stringify(error, null, 2)}</p>
            </div>
          )}

          <div className="absolute bottom-16 w-[calc(100%-6rem)] md:relative md:bottom-0 md:mt-auto md:h-auto md:w-full">
            <ErrorFallBackButtons onClickRetry={onClickRetry} />
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
};

export default ErrorFallbackUI;
