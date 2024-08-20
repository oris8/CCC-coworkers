import { useErrorBoundary } from '@/components/server-error-boundary';
import { useCallback, useState } from 'react';

/* eslint-disable consistent-return */

interface RequestState<T> {
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  data: T | null;
  error: any | null;
}

interface ApiResponse<T> {
  data?: T;
  error?: any;
}

const INITIAL_STATE = {
  isLoading: false,
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  data: null,
  error: null,
};

/**
 * 훅은 API 요청을 수행하고, 요청의 상태와 결과를 관리합니다.
 *
 * @template T - API 응답의 데이터 타입
 *
 * @param {Function} apiFunction - API 요청을 수행하는 함수. 매개변수로 `props`를 받고 `Promise<ApiResponse<T>>`를 반환해야 합니다.
 * @param {boolean} [showErrorFallBack=false] - 에러가 발생했을 때, `ErrorBoundary`를 통해 폴백 UI를 표시할지 여부를 결정합니다. (서버에서 제공하는 오류 메세지가 없는 경우에만 자동으로 폴백 UI를 표시합니다)
 *
 * @returns {{
 *   isLoading: boolean;
 *   isPending: boolean;
 *   isSuccess: boolean;
 *   isError: boolean;
 *   errorMessage: string | null;
 *   data: T | null;
 *   error: any | null;
 *   request: (props?: any) => Promise<{ data: T | null; error: any | null }>;
 * }} 훅의 반환값
 *
 * - `isLoading`: 요청이 진행 중인 상태인지 나타냅니다.
 * - `isPending`: 요청이 대기 중인지 나타냅니다.
 * - `isSuccess`: 요청이 성공적으로 완료되었는지 나타냅니다.
 * - `isError`: 요청이 실패했는지 나타냅니다.
 * - `errorMessage`: 에러 메시지, 에러가 없으면 `null`입니다.
 * - `data`: API 응답 데이터, 데이터가 없으면 `null`입니다.
 * - `error`: 발생한 에러, 에러가 없으면 `null`입니다.
 * - `request`: API 요청을 수행하는 함수. `props`를 매개변수로 받고, `Promise<{ data: T | null; error: any | null }>`를 반환합니다.
 */
const useRequestFunction = <T = any>(
  apiFunction: (...props: any) => Promise<ApiResponse<T>>,
  showErrorFallBack: boolean = false
) => {
  const [state, setState] = useState<RequestState<T>>(INITIAL_STATE);
  const { showBoundary } = useErrorBoundary();

  const request = useCallback(
    async (...props: any) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isPending: true,
      }));

      const response = await apiFunction(...props);

      if (response?.error) {
        setState({
          ...INITIAL_STATE,
          isError: true,
          errorMessage: response.error?.message || '오류가 발생했습니다',
          error: response.error,
        });
        if (showErrorFallBack && !response.error.hasBodyMessage) {
          showBoundary(response?.error);
        }
        return { data: null, error: response.error };
      }
      if (!response?.error) {
        setState({
          ...INITIAL_STATE,
          isSuccess: true,
          data: response?.data || null,
        });
        return { data: response?.data || null, error: null };
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { ...state, request, reset };
};

export default useRequestFunction;
