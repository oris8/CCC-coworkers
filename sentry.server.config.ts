// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://cc2e1bb5476ff87be725f8a58a74a575@o4507812162830336.ingest.us.sentry.io/4507812165517312',

  enabled: process.env.NODE_ENV === 'production',

  release: '0.1.0', // 버전별 오류추적을 위한 release 버전

  environment: 'production',

  normalizeDepth: 6, // 컨텍스트 데이터를 주어진 깊이로 정규화 (기본값: 3)

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
