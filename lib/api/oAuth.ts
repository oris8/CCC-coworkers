import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { AppSecret, OAuthApp, OAuthProvider, UrlType } from '@ccc-types';

// 간편로그인 등록/수정
// Google, Kakao 간편 로그인을 위한 App 을 등록하거나 수정합니다.
// 이미 등록된 앱이 있을 경우 덮어씌워집니다.

export interface OAuthAppUpsertRequestBody {
  appSecret?: AppSecret | null; // Google, KaKao 둘 다 필요하지 않음
  appKey: UrlType; // Google: "클라이언트 id", Kakao: "REST API 키"
  provider: OAuthProvider;
}

export async function oAuth(data: OAuthAppUpsertRequestBody) {
  const { data: response, error } = await client<OAuthApp>(
    ENDPOINTS.OAUTH.POST_OAUTH_APPS,
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: '간편로그인 등록/수정 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}
