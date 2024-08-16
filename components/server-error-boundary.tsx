'use client';

import ErrorFallback from '@/components/common/error/ErrorFallback';
import FetchError from '@/lib/api/HttpClient/FetchError';
import React, { ErrorInfo, createContext, useContext, useState } from 'react';

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
  fallback?: any;
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

  static getDerivedStateFromError(error: Error | FetchError) {
    // 하위 트리에서 throw된 error를 받습니다.
    return { hasError: true, didCatch: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 오류나면 콘솔에 기록
    console.log('---------------  오류가 발생했습니다   ---------------');
    console.log(error, info);
  }

  showBoundary = (error: Error) => {
    this.setState({
      error,
      hasError: true,
      didCatch: true,
    });
  };

  render() {
    let childToRender;

    if (!this.state.hasError) {
      childToRender = this.props.children;
    }

    //hasError값이 true로 바뀌면 fallback을 보여줍니다
    if (this.state.hasError) {
      const props = {
        error: this.state.error,
      };

      childToRender = (
        <ErrorFallback
          {...props}
          onClickRetry={() => this.setState(initialState)}
        />
      );
    }

    const contextValue: ErrorBoundaryContextType = {
      ...this.state,
      showBoundary: this.showBoundary,
    };

    return (
      <ErrorBoundaryContext.Provider value={contextValue}>
        {childToRender}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export default ServerErrorBoundary;
