import { captureException } from '@sentry/nextjs';

import type { ClientResponse } from './client/client';

/**
 * 클라이언트 에러 객체를 생성합니다.
 *
 * 이 함수는 제공된 에러 객체에서 메시지와 원인(cause) 정보를 추출하여
 * 표준화된 클라이언트 에러 객체를 생성합니다.
 *
 * @param {Error | any} error - 변환할 에러 객체.
 * @param {string} [defaultMessage='알 수 없는 오류가 발생했습니다.'] - `error.message`가 없을 경우 사용할 기본 에러 메시지.
 * @returns {object} 에러 정보를 포함한 구조화된 객체.
 */
export const generateClientError = (
  error: any,
  info?: string,
  logging: boolean = true
) => {
  if (logging) captureException(error);

  return {
    info: info || '알 수 없는 오류가 발생했습니다.',
    message: error.message,
    ...error.cause,
  };
};

export const handleApiResponse = <T = unknown>(
  response: ClientResponse<T>,
  defaultErrorMessage: string,
  logging: boolean = true
) => {
  if (response.error) {
    return {
      data: null,
      error: generateClientError(response.error, defaultErrorMessage, logging),
    };
  }
  return { data: response.data, error: null };
};
