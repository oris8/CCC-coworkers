import FetchError from '@/lib/api/HttpClient/FetchError';
import InterceptorManager from '@/lib/api/HttpClient/Interceptor';
import { HttpClientConfig, mergeConfig } from '@/lib/api/HttpClient/utils';

export default class Client {
  private defaults: HttpClientConfig;

  public interceptors: {
    request: InterceptorManager<any>;
    response: InterceptorManager<any>;
  };

  constructor(instanceConfig: HttpClientConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  public async request(
    configOrUrl: string | HttpClientConfig,
    config?: HttpClientConfig
  ): Promise<any> {
    let finalConfig: HttpClientConfig;
    if (typeof configOrUrl === 'string') {
      finalConfig = mergeConfig(this.defaults, { url: configOrUrl, ...config });
    } else {
      finalConfig = mergeConfig(this.defaults, configOrUrl);
    }

    finalConfig.method = (finalConfig.method || 'get').toUpperCase();

    const requestHeaders: { [key: string]: string } = {
      ...this.defaults.headers,
      ...finalConfig.headers,
    };

    // body data가 폼데이터 타입일 경우 추가 설정
    const isFormData = finalConfig.data instanceof FormData;
    if (
      isFormData ||
      requestHeaders['Content-Type'] === 'multipart/form-data'
    ) {
      delete requestHeaders['Content-Type'];
    }
    const requestBody = isFormData
      ? finalConfig?.data
      : JSON.stringify(finalConfig?.data) || undefined;

    let requestOptions: Record<any, any> = {
      // let requestOptions: RequestInit = {
      method: finalConfig.method,
      headers: requestHeaders,
      credentials: finalConfig.withCredentials ? 'include' : 'same-origin',
      body: requestBody,
      ...finalConfig,
    };

    // 요청 인터셉터 실행
    await Promise.all(
      this.interceptors.request.handlers.map(async (handler) => {
        if (!handler.runWhen || handler.runWhen(finalConfig)) {
          requestOptions =
            (await handler.fulfilled?.({
              ...requestOptions,
              ...finalConfig,
            })) || requestOptions;
        }
      })
    );

    // 본 요청 실행
    try {
      const response = await fetch(
        `${requestOptions?.baseURL || finalConfig.baseURL}${finalConfig.url}`,
        requestOptions
      );

      if (!response.ok && response.status >= 400) {
        const errorBody = JSON.parse(
          await response.text().then((text) => text || '{}')
        );

        // 커스텀 FetchError 실행
        // 백엔드에서 보내주는 message가 있으면 error.message에 해당 값을 넣고 아니라면 statusText를 추가
        // hasBodyMessage를 통해 백엔드에서 보내주는 메세지가 있는지 확인 가능
        throw new FetchError(errorBody?.message ?? response.statusText, {
          cause: {
            ...response,
            body: errorBody,
            message: errorBody?.message ?? null,
            hasBodyMessage: !!errorBody?.message,
            statusText: response.statusText,
            status: response.status,
            requestConfig: finalConfig,
          },
        });
      }

      // 일반적인 응답은 json() 처리를 해서 전달
      let handledResponse = await response.json();

      // 응답 인터셉터 실행
      await Promise.all(
        this.interceptors.response.handlers.map(async (handler) => {
          if (!handler.runWhen || handler.runWhen(response)) {
            handledResponse =
              (await handler.fulfilled?.(response)) || handledResponse;
          }
        })
      );

      return handledResponse;
    } catch (error) {
      await Promise.all(
        this.interceptors.response.handlers.map(async (handler) => {
          if (handler.rejected) {
            await handler.rejected(error);
          }
        })
      );

      // 기타 에러 발생시, 이미 client를 거친 FetchError라면 그대로 throw, 아니라면 unknownError 새로 생성
      if (error instanceof FetchError) {
        throw error;
      }

      throw new FetchError('unknownError', { cause: error });
    }
  }
}
