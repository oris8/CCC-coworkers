declare module '@ccc-types' {
  export type PasswordAuthentication = {
    passwordConfirmation: Password;
    password: Password;
  };

  export type SignUpRequestBody = Pick<User, 'nickname' | 'email'> &
    PasswordAuthentication;

  export type SignInRequestBody = Pick<SignUpRequestBody, 'email' | 'password'>;

  export interface SignInWithOAuthRequestBody {
    state: string; // code를 얻을 때 사용하였던 state 값
    redirectUri: UrlType; // example: http://localhost:3000/OAuth/kakao
    token: OAuthToken;
  }
  export interface AuthResponse {
    refreshToken: string;
    accessToken: string;
    user: User;
  }
  // ------------------ OAuth ------------------ //
  export type OAuthToken = string;
  export type AppSecret = string; // 간편 로그인을 위한 비밀 키
  export type OAuthProvider = 'GOOGLE' | 'KAKAO';

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
