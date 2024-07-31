export interface HttpClientConfig {
  baseURL?: string; // 기본 URL
  headers?: { [key: string]: string }; // 요청 헤더
  timeout?: number; // 타임아웃 설정 (밀리초 단위)
  withCredentials?: boolean; // 크로스 사이트 요청에 자격 증명 포함 여부
  method?: string; // method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'; // HTTP 메소드
  url?: string; // 요청 URL (baseURL과 결합됨)
  data?: any; // 요청 본문 (POST, PUT, PATCH 등에서 사용)
  referrer?: string; // 요청의 출처
  referrerPolicy?: ReferrerPolicy; // 출처 정책
  mode?: RequestMode; // 요청 모드 (cors, no-cors, same-origin 등)
  credentials?: RequestCredentials; // 자격 증명 옵션 (same-origin, include, omit)
  cache?: RequestCache; // 캐시 옵션 (default, no-store, reload, no-cache, force-cache, only-if-cached)
  redirect?: RequestRedirect; // 리디렉션 옵션 (follow, manual, error)
  integrity?: string; // 서브 리소스 무결성 (SRI)
  keepalive?: boolean; // Keep-alive 옵션
  signal?: AbortSignal; // 요청 취소 신호
  next?: {
    revalidate?: false | number; // 리소스의 캐시 수명(초)을 설정
    tag?: string[]; // 리소스의 캐시 태그를 설정
  };
}

export function mergeConfig(
  defaults: HttpClientConfig,
  config: HttpClientConfig
): HttpClientConfig {
  const mergedHeaders = {
    ...defaults.headers,
    ...config.headers,
  };

  if (config?.headers?.['Content-Type'] === 'multipart/form-data') {
    delete mergedHeaders['Content-Type'];
  }

  return {
    ...defaults,
    ...config,
    headers: mergedHeaders,
  };
}
