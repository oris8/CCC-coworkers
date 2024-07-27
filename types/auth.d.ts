declare module '@ccc-types' {
  // ------------------ OAuth ------------------ //
  export type OAuthToken = string;
  export type AppSecret = string; // 간편 로그인을 위한 비밀 키

  export enum OAuthProvider {
    GOOGLE = 'GOOGLE',
    KAKAO = 'KAKAO',
  }

  export interface OAuthApp {
    createdAt: DateString;
    updatedAt: DateString;
    appSecret?: AppSecret | null;
    appKey: UrlType; // Google: "클라이언트 id", Kakao: "REST API 키"
    provider: OAuthProvider;
    teamId: string;
    id: Id;
  }
  // ------------------ OAuth ------------------ //
}
