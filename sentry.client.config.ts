// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
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
  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
