/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  webpack: (config) => {
    // SVG 임포트를 처리하는 기존 규칙 찾기
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // 기존 규칙을 재적용하되, ?url로 끝나는 svg 임포트에만 적용
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // 다른 모든 *.svg 임포트를 React 컴포넌트로 변환
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // *.svg?url 제외
        use: ['@svgr/webpack'],
      }
    );

    // *.svg를 무시하도록 파일 로더 규칙 수정 (이제 처리되었으므로)
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  async headers() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_PROXY_URL}/:path*`,
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_PROXY_URL}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
