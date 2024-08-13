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

// 서버사이드렌더링에서는 작동하지않고,
// 클라이언트 측에서 서버액션을 호출할때 동작이 가능합니다
// 컴포넌트 함수에서 useRequestFunction를 선언해서 내부에 필요한 프로퍼티를 가져다 쓰시면 됩니다
// useEffect를 이용해 프로퍼티값 변경을 감지해서 특정 동작 수행이 가능합니다
// NOTE 테스트를 많이 안해봐서 발견 못한 오류가 있을 수 있습니다 !! 공유 주세요 ㅠㅠ
const useRequestFunction = <T = any>(
  apiFunction: (...props: any) => Promise<ApiResponse<T>>
) => {
  const [state, setState] = useState<RequestState<T>>({
    isLoading: false,
    isPending: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    data: null,
    error: null,
  });

  const request = useCallback(
    async (props?: any) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isPending: true,
      }));

      const response = await apiFunction(props);

      if (response?.error) {
        setState({
          isLoading: false,
          isPending: false,
          isSuccess: false,
          isError: true,
          data: null,
          errorMessage: response.error?.message || 'An error occurred',
          error: response.error,
        });

        return { data: null, error: response.error };
      }
      if (!response?.error) {
        setState({
          isLoading: false,
          isPending: false,
          isSuccess: true,
          isError: false,
          data: response?.data || null,
          errorMessage: null,
          error: null,
        });
        return { data: response?.data || null, error: null };
      }
    },
    [apiFunction]
  );

  return { ...state, request };
};

export default useRequestFunction;
