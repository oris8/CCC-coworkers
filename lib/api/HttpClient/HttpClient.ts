import InterceptorManager from '@/lib/api/HttpClient/Interceptor';
import { HttpClientConfig, mergeConfig } from '@/lib/api/HttpClient/utils';

/**
 * 에러는 { message , cause: { ok , status, statusText ... requestConfig} }
 */
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

    let requestOptions: RequestInit = {
      method: finalConfig.method,
      headers: requestHeaders,
      credentials: finalConfig.withCredentials ? 'include' : 'same-origin',
      body: requestBody,
      ...finalConfig,
    };

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

    try {
      const response = await fetch(
        `${finalConfig.baseURL}${finalConfig.url}`,
        requestOptions
      );

      if (!response.ok && response.status >= 400) {
        const errorBody = JSON.parse(
          await response.text().then((text) => text || '{}')
        );

        throw new Error(errorBody?.message ?? response.statusText, {
          cause: { ...response, requestConfig: finalConfig },
        });
      }

      let handledResponse = await response.json();

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

      throw new Error('unknownError', { cause: error });
    }
  }
}
