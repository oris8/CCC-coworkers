'use client';

import React, {
  ErrorInfo,
  createContext,
  createElement,
  isValidElement,
  useContext,
  useState,
} from 'react';

/* eslint-disable */

// 에러 바운더리의 상태 타입
interface ErrorBoundaryState {
  hasError: boolean;
  didCatch: boolean;
  error: Error | null;
}

// 에러 바운더리의 props 타입
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  fallbackRender?: (props: { error: Error | null }) => React.ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error | null }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// 에러 바운더리의 컨텍스트 타입
interface ErrorBoundaryContextType extends ErrorBoundaryState {
  showBoundary: (error: Error) => void;
}

const initialState: ErrorBoundaryState = {
  hasError: false,
  didCatch: false,
  error: null,
};

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | null>(
  null
);

export function useErrorBoundary() {
  const context = useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error('반드시 ErrorBoundary 안에서 사용해야 합니다.');
  }

  const [state, setState] = useState(initialState);

  const showBoundary = (error: Error) =>
    setState({
      error,
      hasError: true,
      didCatch: true,
    });

  context.showBoundary = showBoundary;

  if (state.hasError) {
    throw state.error;
  }

  return context;
}

class ServerErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    // getDerivedStateFromError, 생명주기 관련 함수
    // 에러가 발생한 후 폴백 UI를 렌더링하는 데 사용
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, didCatch: true, error };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   // 생명주기 관련 함수
  //   // 에러 정보를 기록하는데 사용
  //   // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  //   // logErrorToMyService(error, errorInfo);
  //   this.props.onError?.(error, errorInfo);
  // }

  render() {
    const { children, fallbackRender, FallbackComponent, fallback } =
      this.props;

    const { hasError, didCatch, error } = this.state;

    let childToRender = children;

    if (didCatch) {
      const props = {
        error,
      };

      if (typeof fallbackRender === 'function') {
        childToRender = fallbackRender(props);
      } else if (FallbackComponent) {
        childToRender = createElement(FallbackComponent, props);
      } else if (fallback === null || isValidElement(fallback)) {
        childToRender = fallback;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            'react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop'
          );
        }

        throw error;
      }
    }

    return (
      <ErrorBoundaryContext.Provider
        value={{ ...this.state, showBoundary: () => {} }}
      >
        {childToRender}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export default ServerErrorBoundary;
